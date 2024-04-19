import { Editor, Element, Transforms, Range } from "slate";

import { ButtonElement } from "../types";

export const EditabelButtonMethods = {
	isButtonActive(editor: Editor) {
		const [button] = Editor.nodes(editor, {
			match: (n) =>
				!Editor.isEditor(n) && Element.isElement(n) && n.type === "button",
		});
		return !!button;
	},
	insertButton(editor: Editor) {
		if (editor.selection) {
			EditabelButtonMethods.wrapButton(editor);
		}
	},
	wrapButton(editor: Editor) {
		if (EditabelButtonMethods.isButtonActive(editor)) {
			EditabelButtonMethods.unwrapButton(editor);
		}

		const { selection } = editor;
		const isCollapsed = selection && Range.isCollapsed(selection);
		const button: ButtonElement = {
			type: "button",
			children: isCollapsed ? [{ text: "Edit me!" }] : [],
		};

		if (isCollapsed) {
			Transforms.insertNodes(editor, button);
		} else {
			Transforms.wrapNodes(editor, button, { split: true });
			Transforms.collapse(editor, { edge: "end" });
		}
	},
	unwrapButton(editor: Editor) {
		Transforms.unwrapNodes(editor, {
			match: (n) =>
				!Editor.isEditor(n) && Element.isElement(n) && n.type === "button",
		});
	},
};
