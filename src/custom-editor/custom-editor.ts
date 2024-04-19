import { Editor, Element, Range, Transforms } from "slate";
import { ElementTypes, LinkELement, TextAlign } from "../types";

export const LIST_TYPES = ["numbered-list", "bulleted-list"];
export const TEXT_ALIGN_TYPES = ["left", "right", "center", "justify"];

const LinkMethods = {
	// function to check link element is active or not
	isLinkActive(editor: Editor) {
		const [link] = Editor.nodes(editor, {
			match: (n) =>
				!Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
		});

		return !!link;
	},

	// function to insert link in editor
	insertLink(editor: Editor, url: string) {
		if (editor.selection) {
			LinkMethods.wrapLink(editor, url);
		}
	},

	// function to wrap selected text inside link
	wrapLink(editor: Editor, url: string) {
		if (LinkMethods.isLinkActive(editor)) {
			LinkMethods.unwrapLink(editor);
		}

		const { selection } = editor;

		const isCollapsed = selection && Range.isCollapsed(selection);
		const link: LinkELement = {
			type: "link",
			url,
			children: isCollapsed ? [{ text: url }] : [],
		};

		if (isCollapsed) {
			Transforms.insertNodes(editor, link);
		} else {
			Transforms.wrapNodes(editor, link, { split: true });
			Transforms.collapse(editor, { edge: "end" });
		}
	},

	// function to unwrap selected text if it is link
	unwrapLink(editor: Editor) {
		Transforms.unwrapNodes(editor, {
			match: (n) =>
				!Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
		});
	},
};

// this consists functions to handler editor updates
export const CustomEditor = {
	// function to check is mark mode (block, italic, underline) active
	isMarkActive(editor: Editor, format: string) {
		const marks = Editor.marks(editor);
		return marks ? marks[format] === true : false;
	},

	// function to check is block mode active (h1, h1, ol, ul)
	isBlockActive(
		editor: Editor,
		format: string,
		blockType: "align" | "type" = "type"
	) {
		const { selection } = editor;
		if (!selection) return false;

		const [match] = Array.from(
			Editor.nodes(editor, {
				at: Editor.unhangRange(editor, selection),
				match: (n) =>
					!Editor.isEditor(n) &&
					Element.isElement(n) &&
					n[blockType] === format,
			})
		);

		return !!match;
	},

	toggleMark(editor: Editor, format: string) {
		const isActive = CustomEditor.isMarkActive(editor, format);

		if (isActive) {
			Editor.removeMark(editor, format);
		} else {
			Editor.addMark(editor, format, true);
		}
	},

	toggleBlock(editor: Editor, format: string) {
		const isActive = CustomEditor.isBlockActive(
			editor,
			format,
			TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
		);

		const isList = LIST_TYPES.includes(format);

		Transforms.unwrapNodes(editor, {
			match: (n) =>
				!Editor.isEditor(n) &&
				Element.isElement(n) &&
				LIST_TYPES.includes(n.type) &&
				!TEXT_ALIGN_TYPES.includes(format),
			split: true,
		});

		let newProperties: Partial<Element>;
		if (TEXT_ALIGN_TYPES.includes(format)) {
			newProperties = {
				align: isActive ? undefined : (format as TextAlign),
			};
		} else {
			newProperties = {
				type: isActive
					? "paragraph"
					: isList
					? "list-item"
					: (format as ElementTypes),
			};
		}
		Transforms.setNodes<Element>(editor, newProperties);

		if (!isActive && isList) {
			const block = { type: format, children: [] };
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			Transforms.wrapNodes(editor, block as any);
		}
	},
	link: LinkMethods,
};
