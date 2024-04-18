import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

type ParagraphElement = {
	type: "paragraph";
	align?: string;
	children: Descendant[];
};

type CodeBlockElement = {
	type: "code";
	language?: string;
	children: Descendant[];
};

type CustomElement = ParagraphElement | CodeBlockElement;

type CustomText = {
	text: string;
	bold?: boolean;
	italic?: boolean;
	code?: boolean;
};

declare module "slate" {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}
