import { Editor } from "slate";

export const MarkMethods = {
	// function to check is mark mode (block, italic, underline) active
	isMarkActive(editor: Editor, format: string) {
		const marks = Editor.marks(editor);
		return marks ? marks[format] === true : false;
	},

	// function to toggle mark formatting
	toggleMark(editor: Editor, format: string) {
		// check if mark formatting is active
		const isActive = MarkMethods.isMarkActive(editor, format);

		// if active, remove it, else add it
		if (isActive) {
			Editor.removeMark(editor, format);
		} else {
			Editor.addMark(editor, format, true);
		}
	},
};
