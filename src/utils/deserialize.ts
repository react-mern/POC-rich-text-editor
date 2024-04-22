import { Node } from "slate";
import { jsx } from "slate-hyperscript";

interface ElementType {
	[key: string]: (element: HTMLElement | ChildNode) => {
		type: string;
		url?: string | null;
	};
}
const ELEMENT_TAGS: ElementType = {
	A: (element) => {
		if (element instanceof HTMLElement) {
			return {
				type: "link",
				url: element.getAttribute("href"),
			};
		} else {
			return {
				type: "link",
			};
		}
	},
	BLOCKQUOTE: () => ({ type: "quote" }),
	H1: () => ({ type: "heading-one" }),
	H2: () => ({ type: "heading-two" }),
	H3: () => ({ type: "heading-three" }),
	H4: () => ({ type: "heading-four" }),
	H5: () => ({ type: "heading-five" }),
	H6: () => ({ type: "heading-six" }),
	IMG: (element) => {
		if (element instanceof HTMLElement) {
			return {
				type: "image",
				url: element.getAttribute("src"),
			};
		} else {
			return {
				type: "image",
			};
		}
	},
	LI: () => ({ type: "list-item" }),
	OL: () => ({ type: "numbered-list" }),
	P: () => ({ type: "paragraph" }),
	PRE: () => ({ type: "code" }),
	UL: () => ({ type: "bulleted-list" }),
};

interface TextType {
	[key: string]: () => { [key: string]: boolean };
}

const TEXT_TAGS: TextType = {
	CODE: () => ({ code: true }),
	DEL: () => ({ strikethrough: true }),
	EM: () => ({ italic: true }),
	I: () => ({ italic: true }),
	S: () => ({ strikethrough: true }),
	STRONG: () => ({ bold: true }),
	U: () => ({ underline: true }),
};

export const deserialize = (element: HTMLElement | ChildNode) => {
	// if actual text inside element
	if (element.nodeType === 3) {
		return element.textContent;
	} else if (element.nodeType !== 1) {
		// if node not equal to ELEMENT_NODE
		return null;
	} else if (element.nodeName === "BR") {
		// if node is 'br'
		return "\n";
	}

	const { nodeName } = element;
	let parent = element;

	if (
		nodeName === "PRE" &&
		element.childNodes[0] &&
		element.childNodes[0].nodeName === "CODE"
	) {
		parent = element.childNodes[0];
	}

	// looping through children and deserializing them
	let children: Node[] = Array.from(parent.childNodes)
		.map((element) => deserialize(element))
		.flat() as Node[];

	// if no child found
	if (children.length === 0) {
		children = [{ text: "" }];
	}

	// if node is body
	if (element.nodeName === "BODY") {
		return jsx("fragment", {}, children);
	}

	// if node is an element tag, returning it's CustomElement
	if (ELEMENT_TAGS[nodeName]) {
		const attrs = ELEMENT_TAGS[nodeName](element);
		return jsx("element", attrs, children);
	}

	// if node is a text tag, returning it's CustomText
	if (TEXT_TAGS[nodeName]) {
		const attrs = TEXT_TAGS[nodeName]();
		return children.map((child) => jsx("text", attrs, child));
	}

	return children;
};
