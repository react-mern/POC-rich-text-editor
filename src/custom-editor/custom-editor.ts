import { LinkMethods } from "./link";
import { MarkMethods } from "./mark";
import { EditabelButtonMethods } from "./editable-button";
import { BlockMethods } from "./block";
import { ImageMethods } from "./image";

// this consists functions to handler editor updates
export const CustomEditor = {
	mark: MarkMethods,
	block: BlockMethods,
	link: LinkMethods,
	editableButton: EditabelButtonMethods,
	image: ImageMethods,
};
