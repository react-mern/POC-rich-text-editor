import { Editor, Element, Transforms } from "slate";
import { ElementTypes, TextAlign } from "../types";

export const LIST_TYPES = ["numbered-list", "bulleted-list"];
export const TEXT_ALIGN_TYPES = ["left", "right", "center", "justify"];

// this consists functions to handler editor updates
export const CustomEditor = {
	// function to check is mark mode (block, italic, underline) active
	isMarkActive(editor: Editor, format: string) {
		const marks = Editor.marks(editor);
		return marks ? marks[format] === true : false;
	},

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

	toggleMark(editor: Editor, format: string) {
		const isActive = CustomEditor.isMarkActive(editor, format);

		if (isActive) {
			Editor.removeMark(editor, format);
		} else {
			Editor.addMark(editor, format, true);
		}
	},

	toggleBlock(editor: Editor, format: string) {
		const isActive = CustomEditor.isBlockActive(
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
