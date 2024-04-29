import isUrl from "is-url";
import { deserialize } from "../utils/deserialize";
import { CustomEditor } from "../custom-editor/custom-editor";
import { Editor, Element, Node, Point, Range, Transforms } from "slate";

// creating a custom plugin by overriding editor methods,
// to handle inline links, buttons and badges,
// to handle image, youtube embed insertion by copying link into editor
// to handler check-list deletion
export const withCustomFeatures = (editor: Editor) => {
	// extracting editor methods
	const { insertData, isVoid, insertText, isInline, deleteBackward } = editor;

	// overrinding isVoid to return image and video type elements as void elements
	editor.isVoid = (element) => {
		return ["image", "video"].includes(element.type) ? true : isVoid(element);
	};

	// overriding isLine to return link, button and badge as inline elements
	editor.isInline = (element: Element) =>
		["link", "button", "badge"].includes(element.type) || isInline(element);

	// when text is inserted and it is a URL, make it a link, else insert normal text
	editor.insertText = (text: string) => {
		if (text && isUrl(text)) {
			CustomEditor.link.wrapLink(editor, text);
		} else {
			insertText(text);
		}
	};

	// insert image with directly pasted from local
	editor.insertData = async (data) => {
		const text = data.getData("text/plain");
		const html = data.getData("text/html");

		const { files } = data;

		const isImage = await CustomEditor.image.isImageUrl(text);

		if (files && files.length > 0) {
			for (const file of files) {
				const reader = new FileReader();
				const [mime] = file.type.split("/");

				if (mime === "image") {
					reader.addEventListener("load", () => {
						const url = reader.result;
						if (url) {
							CustomEditor.image.insertImage(editor, url as string);
						}
					});

					reader.readAsDataURL(file);
				}
			}
		} else if (CustomEditor.embedVideo.isVideoURL(text)) {
			// if pasted link is of youtube video, generate embed link
			const embedUrl = CustomEditor.embedVideo.getEmbedURL(text);

			// insert embed video element in editor
			embedUrl && CustomEditor.embedVideo.insertEmbedVideo(editor, embedUrl);
		} else if (isImage) {
			// if link is an image, insert image to editor
			CustomEditor.image.insertImage(editor, text);
		} else if (text && isUrl(text)) {
			// if text is an link
			CustomEditor.link.wrapLink(editor, text);
		} else if (html) {
			// getting parsed html
			const parsed = new DOMParser().parseFromString(html, "text/html");

			// deserialinzing html
			const fragment = deserialize(parsed.body);

			// inserting html in editor
			Transforms.insertFragment(editor, fragment as Node[]);
			return;
		} else {
			insertData(data);
		}
	};

	editor.deleteBackward = (...args) => {
		// getting selected state of editor
		const { selection } = editor;

		// if selection is not collapsed
		if (selection && Range.isCollapsed(selection)) {
			// if selected state is check-list-item store get it match
			const [match] = Editor.nodes(editor, {
				match: (n) =>
					!Editor.isEditor(n) &&
					Element.isElement(n) &&
					n.type === "check-list-item",
			});

			// if match found
			if (match) {
				const [, path] = match;

				// start is starting point of check-list-item
				const start = Editor.start(editor, path);

				// if selected state's starting point is same as matched check-list-item's starting point
				if (Point.equals(selection?.anchor, start)) {
					// create a new node
					const newProperties: Partial<Element> = {
						type: "paragraph",
					};

					// insert paragraph node
					Transforms.setNodes(editor, newProperties, {
						match: (n) =>
							!Editor.isEditor(n) &&
							Element.isElement(n) &&
							n.type === "check-list-item",
					});
					return;
				}
			}
		}
		deleteBackward(...args);
	};

	return editor;
};
