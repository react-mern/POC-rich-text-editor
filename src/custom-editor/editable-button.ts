import { Editor, Element, Transforms, Range } from "slate";

import { ButtonElement } from "../types";

export const EditabelButtonMethods = {
	// function to check if button is active
	isButtonActive(editor: Editor) {
		const [button] = Editor.nodes(editor, {
			match: (n) =>
				!Editor.isEditor(n) && Element.isElement(n) && n.type === "button",
		});
		return !!button;
	},

	// function to insert button in editor
	insertButton(editor: Editor) {
		if (editor.selection) {
			EditabelButtonMethods.wrapButton(editor);
		}
	},

	// function to wrap nodes in button
	wrapButton(editor: Editor) {
		// if button is active, unwrap it
		if (EditabelButtonMethods.isButtonActive(editor)) {
			EditabelButtonMethods.unwrapButton(editor);
		}

		// get selected state
		const { selection } = editor;

		// check if selected text is collapsed or not
		const isCollapsed = selection && Range.isCollapsed(selection);

		// define a button element
		const button: ButtonElement = {
			type: "button",
			children: isCollapsed ? [{ text: "Edit me!" }] : [],
		};

		// if nothing selected, insert a new node
		if (isCollapsed) {
			Transforms.insertNodes(editor, button);
		} else {
			// else wrap nodes around button

			Transforms.wrapNodes(editor, button, { split: true });
			Transforms.collapse(editor, { edge: "end" });
		}
	},

	// function to unwrap a badge that is already wrapped
	unwrapButton(editor: Editor) {
		Transforms.unwrapNodes(editor, {
			match: (n) =>
				!Editor.isEditor(n) && Element.isElement(n) && n.type === "button",
		});
	},
};
