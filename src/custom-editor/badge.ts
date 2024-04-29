import { Editor, Element, Range, Transforms } from "slate";

import { BadgeElement } from "../types";

// methods to handle insertion of badge in editor
export const BadgeMethods = {
	// to check is badge active or not
	isBadgeActive(editor: Editor) {
		const [badge] = Editor.nodes(editor, {
			match: (n) =>
				!Editor.isEditor(n) && Element.isElement(n) && n.type === "badge",
		});

		return !!badge;
	},

	// function to insert badge in editor
	insertBadge(editor: Editor, variant: "success" | "error" | "info") {
		// if text is selected, wrap it in badge
		if (editor.selection) {
			BadgeMethods.wrapBadge(editor, variant);
		}
	},

	// function to wrap text inside badge
	wrapBadge(editor: Editor, variant: "success" | "error" | "info") {
		// if badge already active, unwrap it
		if (BadgeMethods.isBadgeActive(editor)) {
			BadgeMethods.unwrapBadge(editor);
		}

		// get selected state
		const { selection } = editor;

		// check if selected text is collapsed or not
		const isCollapsed = selection && Range.isCollapsed(selection);

		// define a badge element
		const badge: BadgeElement = {
			type: "badge",
			variant,
			children: isCollapsed ? [{ text: "Badge text" }] : [],
		};

		// if nothing selected, insert a new node
		if (isCollapsed) {
			Transforms.insertNodes(editor, badge);
		} else {
			// else wrap nodes around badge
			Transforms.wrapNodes(editor, badge, { split: true });
			Transforms.collapse(editor, { edge: "end" });
		}
	},

	// function to unwrap a badge that is already wrapped
	unwrapBadge(editor: Editor) {
		Transforms.unwrapNodes(editor, {
			match: (n) =>
				!Editor.isEditor(n) && Element.isElement(n) && n.type === "badge",
		});
	},
};
