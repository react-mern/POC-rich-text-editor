import isUrl from "is-url";

import { Editor, Element } from "slate";
import { CustomEditor } from "../custom-editor/custom-editor";

// overriding editor methods
export const withInlines = (editor: Editor) => {
	const { insertData, insertText, isInline, isElementReadOnly, isSelectable } =
		editor;

	editor.isInline = (element: Element) =>
		["link", "button", "badge"].includes(element.type) || isInline(element);

	editor.isElementReadOnly = (element: Element) =>
		element.type === "badge" || isElementReadOnly(element);

	editor.isSelectable = (element: Element) =>
		element.type !== "badge" && isSelectable(element);

	editor.insertText = (text: string) => {
		if (text && isUrl(text)) {
			CustomEditor.link.wrapLink(editor, text);
		} else {
			insertText(text);
		}
	};

	editor.insertData = (data) => {
		const text = data.getData("text/plain");

		if (text && isUrl(text)) {
			CustomEditor.link.wrapLink(editor, text);
		} else {
			insertData(data);
		}
	};

	return editor;
};
