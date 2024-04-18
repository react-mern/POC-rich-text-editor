import { Editor, Element, type Editor as EditorType, Transforms } from "slate";

export const CustomEditor = {
	isBoldMarkActive(editor: EditorType) {
		const marks = Editor.marks(editor);
		return marks ? marks.bold === true : false;
	},

	isCodeBlockActive(editor: EditorType) {
		const [match] = Editor.nodes(editor, {
			match: (n) => Element.isElement(n) && n.type === "code",
		});

		return !!match;
	},

	toggleBoldMark(editor: EditorType) {
		const isActive = CustomEditor.isBoldMarkActive(editor);
		if (isActive) {
			Editor.removeMark(editor, "bold");
		} else {
			Editor.addMark(editor, "bold", true);
		}
	},
	toggleCodeBlock(editor: EditorType) {
		const isActive = CustomEditor.isCodeBlockActive(editor);
		Transforms.setNodes(
			editor,
			{ type: isActive ? undefined : "code" },
			{ match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
		);
	},
};
