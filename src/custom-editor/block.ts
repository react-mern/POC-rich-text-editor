import { Editor, Element, Transforms } from "slate";

import {
	AlignElement,
	ElementTypes,
	NonAlignElement,
	TextAlign,
} from "../types";

export const LIST_TYPES = ["numbered-list", "bulleted-list"];
export const TEXT_ALIGN_TYPES = ["left", "right", "center", "justify"];

export const BlockMethods = {
	// function to check is block mode active (h1, h1, ol, ul)
	isBlockActive(
		editor: Editor,
		format: string,
		blockType: "align" | "type" = "type"
	) {
		const { selection } = editor;
		if (!selection) return false;

		const [match] = Array.from(
			Editor.nodes(editor, {
				at: Editor.unhangRange(editor, selection),
				match: (n) => {
					if (!Editor.isEditor(n) && Element.isElement(n)) {
						if (BlockMethods.isAlignElement(n)) {
							return n[blockType] === format;
						} else if (BlockMethods.isNonAlignElement(n)) {
							return n.type === format;
						}
					}
					return false;
				},
			})
		);

		return !!match;
	},

	// function to toggle block elements
	toggleBlock(editor: Editor, format: string) {
		// check if node is already a block element
		const isActive = BlockMethods.isBlockActive(
			editor,
			format,
			TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
		);

		const isList = LIST_TYPES.includes(format);

		// unwrap nodes that are to be list types
		Transforms.unwrapNodes(editor, {
			match: (n) =>
				!Editor.isEditor(n) &&
				Element.isElement(n) &&
				LIST_TYPES.includes(n.type) &&
				!TEXT_ALIGN_TYPES.includes(format),
			split: true,
		});

		let newProperties: Partial<Element>;

		// if alignment is provided and already a block element, add align property in that element
		if (TEXT_ALIGN_TYPES.includes(format)) {
			newProperties = {
				align: isActive ? undefined : (format as TextAlign),
			};
		} else {
			// else change block to normal paragraph element, or list item, or format that is provided
			newProperties = {
				type: isActive
					? "paragraph"
					: isList
					? "list-item"
					: (format as ElementTypes),
			};
		}

		// set new nodes with new properties
		Transforms.setNodes<Element>(editor, newProperties);

		// if normal element, and list format provided, convert it to a list
		if (!isActive && isList) {
			const block = { type: format, children: [] };
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			Transforms.wrapNodes(editor, block as any);
		}
	},
	// to check element is an alignable element
	isAlignElement: (n: Element): n is AlignElement => "align" in n,
	// to check element is an non-alignable element
	isNonAlignElement: (n: Element): n is NonAlignElement => !("align" in n),
};
