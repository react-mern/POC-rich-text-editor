import { Editor, Node, Transforms } from "slate";
import { deserialize } from "../utils/deserialize";

// overrinding editor method to insert pasted html
export const withHtml = (editor: Editor) => {
	const { insertData } = editor;
	editor.insertData = (data) => {
		const html = data.getData("text/html");

		// if html found
		if (html) {
			// getting parsed html
			const parsed = new DOMParser().parseFromString(html, "text/html");

			// deserialinzing html
			const fragment = deserialize(parsed.body);

			// inserting html in editor
			Transforms.insertFragment(editor, fragment as Node[]);
			return;
		}

		insertData(data);
	};
	return editor;
};
