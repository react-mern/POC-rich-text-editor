import { Editor, Transforms } from "slate";
import { VideoElement } from "../types";

const embedRegesxes = [
	{
		regex: /https:\/\/www\.youtube\.com\/watch\?v=(\w+)/,
	},
];

export const EmbedVideoMethods = {
	// to verify if url is of youtube
	isVideoURL(url: string) {
		let result = false;
		embedRegesxes.some(({ regex }) => {
			if (url.match(regex)) {
				result = true;
			} else {
				result = false;
			}
		});
		return result;
	},

	// to generate embed url of link
	getEmbedURL(url: string) {
		let id;
		embedRegesxes.some(({ regex }) => {
			const match = url.match(regex);
			if (match) {
				id = match[1];
			}
		});
		const embedURL = `https://www.youtube.com/embed/${id}`;
		return embedURL;
	},

	// insert video in editor
	insertEmbedVideo(editor: Editor, url: string) {
		// create empty text
		const text = { text: "" };

		// create video element
		const video: VideoElement = {
			type: "video",
			url,
			children: [text],
		};

		// insert video element in editor
		Transforms.insertNodes(editor, video);

		// insert empty paragraph after video in editor
		Transforms.insertNodes(editor, {
			type: "paragraph",
			children: [{ text: "" }],
		});
	},
};
