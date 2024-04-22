import { Editor } from "slate";
import { CustomEditor } from "../custom-editor/custom-editor";

// overrinding editor methods
export const withImages = (editor: Editor) => {
	const { insertData, isVoid } = editor;

	editor.isVoid = (element) => {
		return element.type === "image" ? true : isVoid(element);
	};

	// insert image with directly pasted from local
	editor.insertData = async (data) => {
		const text = data.getData("text/plain");
		const { files } = data;

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
		} else if (await CustomEditor.image.isImageUrl(text)) {
			CustomEditor.image.insertImage(editor, text);
		} else {
			insertData(data);
		}
	};

	return editor;
};
