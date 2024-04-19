import { Editor } from "slate";

export const MarkMethods = {
	// function to check is mark mode (block, italic, underline) active
	isMarkActive(editor: Editor, format: string) {
		const marks = Editor.marks(editor);
		return marks ? marks[format] === true : false;
	},
	toggleMark(editor: Editor, format: string) {
		const isActive = MarkMethods.isMarkActive(editor, format);

		if (isActive) {
			Editor.removeMark(editor, format);
		} else {
			Editor.addMark(editor, format, true);
		}
	},
};
