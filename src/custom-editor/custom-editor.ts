import { LinkMethods } from "./link";
import { MarkMethods } from "./mark";
import { BlockMethods } from "./block";
import { ImageMethods } from "./image";
import { BadgeMethods } from "./badge";
import { EmbedVideoMethods } from "./embedVideo";

interface CustomEditorInterface {
	mark: typeof MarkMethods;
	block: typeof BlockMethods;
	link: typeof LinkMethods;
	image: typeof ImageMethods;
	badge: typeof BadgeMethods;
	embedVideo: typeof EmbedVideoMethods;
}

// this consists functions to handler editor updates
export const CustomEditor: CustomEditorInterface = {
	mark: MarkMethods,
	block: BlockMethods,
	link: LinkMethods,
	image: ImageMethods,
	badge: BadgeMethods,
	embedVideo: EmbedVideoMethods,
};
