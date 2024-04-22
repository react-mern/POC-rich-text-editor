import { Editor, Element, Range, Transforms } from "slate";

import { BadgeElement } from "../types";

export const BadgeMethods = {
	isBadgeActive(editor: Editor) {
		const [badge] = Editor.nodes(editor, {
			match: (n) =>
				!Editor.isEditor(n) && Element.isElement(n) && n.type === "badge",
		});

		return !!badge;
	},
	insertBadge(editor: Editor, variant: "success" | "error" | "info") {
		if (editor.selection) {
			BadgeMethods.wrapBadge(editor, variant);
		}
	},
	wrapBadge(editor: Editor, variant: "success" | "error" | "info") {
		if (BadgeMethods.isBadgeActive(editor)) {
			BadgeMethods.unwrapBadge(editor);
		}

		const { selection } = editor;
		const isCollapsed = selection && Range.isCollapsed(selection);
		const badge: BadgeElement = {
			type: "badge",
			variant,
			children: isCollapsed ? [{ text: "Badge text" }] : [],
		};

		if (isCollapsed) {
			Transforms.insertNodes(editor, badge);
		} else {
			Transforms.wrapNodes(editor, badge, { split: true });
			Transforms.collapse(editor, { edge: "end" });
		}
	},
	unwrapBadge(editor: Editor) {
		Transforms.unwrapNodes(editor, {
			match: (n) =>
				!Editor.isEditor(n) && Element.isElement(n) && n.type === "badge",
		});
	},
};
