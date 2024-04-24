import { LinkMethods } from "./link";
import { MarkMethods } from "./mark";
import { BlockMethods } from "./block";
import { ImageMethods } from "./image";
import { BadgeMethods } from "./badge";
import { EmbedVideoMethods } from "./embedVideo";
import { EditabelButtonMethods } from "./editable-button";

interface CustomEditorInterface {
	mark: typeof MarkMethods;
	block: typeof BlockMethods;
	link: typeof LinkMethods;
	editableButton: typeof EditabelButtonMethods;
	image: typeof ImageMethods;
	badge: typeof BadgeMethods;
	embedVideo: typeof EmbedVideoMethods;
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
};
