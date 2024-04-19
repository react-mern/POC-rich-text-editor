import { Editor, Element, Transforms, Range } from "slate";

import { LinkELement } from "../types";

export const LinkMethods = {
	// function to check link element is active or not
	isLinkActive(editor: Editor) {
		const [link] = Editor.nodes(editor, {
			match: (n) =>
				!Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
		});

		return !!link;
	},

	// function to insert link in editor
	insertLink(editor: Editor, url: string) {
		if (editor.selection) {
			LinkMethods.wrapLink(editor, url);
		}
	},

	// function to wrap selected text inside link
	wrapLink(editor: Editor, url: string) {
		if (LinkMethods.isLinkActive(editor)) {
			LinkMethods.unwrapLink(editor);
		}

		const { selection } = editor;

		const isCollapsed = selection && Range.isCollapsed(selection);
		const link: LinkELement = {
			type: "link",
			url,
			children: isCollapsed ? [{ text: url }] : [],
		};

		if (isCollapsed) {
			Transforms.insertNodes(editor, link);
		} else {
			Transforms.wrapNodes(editor, link, { split: true });
			Transforms.collapse(editor, { edge: "end" });
		}
	},

	// function to unwrap selected text if it is link
	unwrapLink(editor: Editor) {
		Transforms.unwrapNodes(editor, {
			match: (n) =>
				!Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
		});
	},
};
