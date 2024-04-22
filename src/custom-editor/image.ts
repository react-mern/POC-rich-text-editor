import isUrl from "is-url";
import { Editor, Transforms } from "slate";
import { ImageELement } from "../types";

export const ImageMethods = {
	// function to check url is of image or not
	async isImageUrl(url: string) {
		if (!url) return false;
		if (!isUrl(url)) return false;

		return new Promise((resolve) => {
			const img = new Image();
			img.onload = () => resolve(true);
			img.onerror = () => resolve(false);
			img.src = url;
		});
	},

	// function to add image in editor
	insertImage(editor: Editor, url: string) {
		// creating empty text
		const text = { text: "" };

		// creating image object
		const image: ImageELement = { type: "image", url, children: [text] };

		// inserting image node in editor
		Transforms.insertNodes(editor, image);

		// inserting empty paragraph after image
		Transforms.insertNodes(editor, {
			type: "paragraph",
			children: [{ text: "" }],
		});
	},
};
