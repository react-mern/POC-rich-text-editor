import { Element } from "slate";

import { LinkMethods } from "./link";
import { MarkMethods } from "./mark";
import { BlockMethods } from "./block";
import { ImageMethods } from "./image";
import { BadgeMethods } from "./badge";
import { EmbedVideoMethods } from "./embedVideo";
import { AlignElement, NonAlignElement } from "../types";
import { EditabelButtonMethods } from "./editable-button";

interface CustomEditorInterface {
	mark: typeof MarkMethods;
	block: typeof BlockMethods;
	link: typeof LinkMethods;
	editableButton: typeof EditabelButtonMethods;
	image: typeof ImageMethods;
	badge: typeof BadgeMethods;
	embedVideo: typeof EmbedVideoMethods;
	isAlignElement: (n: Element) => n is AlignElement;
	isNonAlignElement: (n: Element) => n is NonAlignElement;
}

// this consists functions to handler editor updates
export const CustomEditor: CustomEditorInterface = {
	mark: MarkMethods,
	block: BlockMethods,
	link: LinkMethods,
	editableButton: EditabelButtonMethods,
	image: ImageMethods,
	badge: BadgeMethods,
	embedVideo: EmbedVideoMethods,
	isAlignElement: (n: Element): n is AlignElement => "align" in n,
	isNonAlignElement: (n: Element): n is NonAlignElement =>
		!("align" in Element),
};
