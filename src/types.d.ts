/* eslint-disable no-mixed-spaces-and-tabs */
import { ReactEditor } from "slate-react";
import { BaseEditor, Descendant, Range, BaseRange, Element } from "slate";

export type TextAlign =
	| "start"
	| "end"
	| "left"
	| "right"
	| "center"
	| "justify"
	| "match-parent";

export type ParagraphElement = {
	type: "paragraph";
	align?: TextAlign;
	children: Descendant[];
};

export type BlockQuoteElement = {
	type: "block-quote";
	align?: TextAlign;
	children: Descendant[];
};

export type BulledtedListElement = {
	type: "bulleted-list";
	align?: TextAlign;
	children: Descendant[];
};

export type NumberedListElement = {
	type: "numbered-list";
	align?: TextAlign;
	children: Descendant[];
};

export type CheckListItemElement = {
	type: "check-list-item";
	checked: boolean;
	children: Descendant[];
};

export type EditableVoidElement = {
	type: "editable-void";
	children: EmptyText[];
};

export type HeadingOneElement = {
	type: "heading-one";
	align?: TextAlign;
	children: Descendant[];
};

export type HeadingTwoElement = {
	type: "heading-two";
	align?: TextAlign;
	children: Descendant[];
};

export type ImageELement = {
	type: "image";
	url: string;
	children: EmptyText[];
};

export type ButtonElement = { type: "button"; children: Descendant[] };

export type BadgeElement = { type: "badge"; children: Descendant[] };

export type ListItemElement = {
	type: "list-item";
	align?: TextAlign;
	children: Descendant[];
};

export type MentionElement = {
	type: "mention";
	character: string;
	children: CustomText[];
};

export type LinkELement = { type: "link"; url: string; children: Descendant[] };

export type TableElement = { type: "table"; children: TableRow[] };

export type TableCellElement = { type: "table-cell"; children: CustomText[] };

export type TableRowElement = { type: "table-row"; children: TableCell[] };

export type TitleElement = { type: "title"; children: Descendant[] };

export type VideoElement = {
	type: "video";
	url: string;
	children: EmptyText[];
};

export type CodeBlockElement = {
	type: "code-block";
	language: string;
	children: Descendant[];
};

export type CodeLineElement = {
	type: "code-line";
	children: Descendant[];
};

export type CustomElement =
	| BlockQuoteElement
	| BulledtedListElement
	| CheckListItemElement
	| EditableVoidElement
	| HeadingOneElement
	| HeadingTwoElement
	| ImageELement
	| LinkELement
	| ButtonElement
	| BadgeElement
	| ListItemElement
	| MentionElement
	| NumberedListElement
	| ParagraphElement
	| TableElement
	| TableRowElement
	| TableCellElement
	| TitleElement
	| VideoElement
	| CodeBlockElement
	| CodeLineElement;

export type ElementTypes =
	| "paragraph"
	| "block-quote"
	| "bulleted-list"
	| "numbered-list"
	| "check-list-item"
	| "editable-void"
	| "heading-one"
	| "heading-two"
	| "image"
	| "button"
	| "badge"
	| "list-item"
	| "mention"
	| "link"
	| "table"
	| "table-cell"
	| "table-row"
	| "title"
	| "video"
	| "code-block"
	| "code-line";

export type CustomText = {
	text: string;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	code?: boolean;
	[key: string]: unknown;
};

export type EmptyText = {
	text: string;
};

declare module "slate" {
	interface CustomTypes {
		Editor: BaseEditor &
			ReactEditor & {
				nodeToDecorations?: Map<Element, Range[]>;
			};
		Element: CustomElement;
		Text: CustomText;
		Range: BaseRange & {
			[key: string]: unknown;
		};
	}
}
