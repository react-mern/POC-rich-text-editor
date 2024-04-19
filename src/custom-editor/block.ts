import { Editor, Element, Transforms } from "slate";
import { ElementTypes, TextAlign } from "../types";

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
				match: (n) =>
					!Editor.isEditor(n) &&
					Element.isElement(n) &&
					n[blockType] === format,
			})
		);

		return !!match;
	},

	toggleBlock(editor: Editor, format: string) {
		const isActive = BlockMethods.isBlockActive(
			editor,
			format,
			TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
		);

		const isList = LIST_TYPES.includes(format);

		Transforms.unwrapNodes(editor, {
			match: (n) =>
				!Editor.isEditor(n) &&
				Element.isElement(n) &&
				LIST_TYPES.includes(n.type) &&
				!TEXT_ALIGN_TYPES.includes(format),
			split: true,
		});

		let newProperties: Partial<Element>;
		if (TEXT_ALIGN_TYPES.includes(format)) {
			newProperties = {
				align: isActive ? undefined : (format as TextAlign),
			};
		} else {
			newProperties = {
				type: isActive
					? "paragraph"
					: isList
					? "list-item"
					: (format as ElementTypes),
			};
		}
		Transforms.setNodes<Element>(editor, newProperties);

		if (!isActive && isList) {
			const block = { type: format, children: [] };
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			Transforms.wrapNodes(editor, block as any);
		}
	},
};
