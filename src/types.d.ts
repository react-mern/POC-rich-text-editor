// TypeScript users only add this code
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

type CustomElement =
	| { type: "paragraph"; children: CustomText[] }
	| { type: "code"; children: CustomText[] };

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
