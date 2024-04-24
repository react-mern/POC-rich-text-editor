import { useMemo } from "react";
import { Descendant, type Editor as EditorType } from "slate";

const useContent = () => {
	// to return stored content or initial value
	const content: Descendant[] = useMemo(() => {
		const storedContent = localStorage.getItem("content");
		if (storedContent) {
			return JSON.parse(storedContent);
		} else {
			return [
				{
					type: "paragraph",
					children: [
						{ text: "This is editable " },
						{ text: "rich", bold: true },
						{ text: " text, " },
						{ text: "much", italic: true },
						{ text: " better than a " },
						{ text: "<textarea>", code: true },
						{ text: "!" },
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Since it's rich text, you can do things like turn a selection of text ",
						},
						{ text: "bold", bold: true },
						{
							text: ", or add a semantically rendered block quote in the middle of the page, like this:",
						},
					],
				},
				{
					type: "block-quote",
					children: [{ text: "A wise quote." }],
				},
				{
					type: "heading-one",
					children: [{ text: "Heading 1 example" }],
				},
				{
					type: "heading-two",
					children: [{ text: "Heading 2 example" }],
				},
				{
					type: "heading-two",
					children: [{ text: "Bullet list example" }],
				},
				{
					type: "bulleted-list",
					children: [
						{ type: "list-item", children: [{ text: "This is" }] },
						{ type: "list-item", children: [{ text: "bullet list" }] },
					],
				},
				{
					type: "heading-two",
					children: [{ text: "Numbered list example" }],
				},
				{
					type: "numbered-list",
					children: [
						{ type: "list-item", children: [{ text: "This is" }] },
						{ type: "list-item", children: [{ text: "numbered list" }] },
					],
				},
				{
					type: "paragraph",
					align: "left",
					children: [{ text: "left align text" }],
				},
				{
					type: "paragraph",
					align: "center",
					children: [{ text: "Centre align text" }],
				},
				{
					type: "paragraph",
					align: "right",
					children: [{ text: "Right align text" }],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "In addition to block nodes, you can create inline nodes. Here is a ",
						},
						{
							type: "link",
							url: "https://en.wikipedia.org/wiki/Hypertext",
							children: [{ text: "hyperlink" }],
						},
						{
							text: ", and here is a more unusual inline: an ",
						},
						{
							type: "button",
							children: [{ text: "editable button" }],
						},
						{
							text: "! Here is an inline badge: ",
						},
						{
							type: "badge",
							variant: "success",
							children: [{ text: "Approved" }],
						},
						{
							text: ".",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "There are two ways to add links. You can either add a link via the toolbar icon above, or copy a URL to your keyboard and paste it while a range of text is selected. ",
						},
						// The following is an example of an inline at the end of a block.
						// This is an edge case that can cause issues.
						{
							type: "link",
							url: "https://twitter.com/JustMissEmma/status/1448679899531726852",
							children: [{ text: "Finally, here is our favorite dog video." }],
						},
						{ text: "" },
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "In addition to nodes that contain editable text, you can also create other types of nodes, like images or videos.",
						},
					],
				},
				{
					type: "image",
					url: "https://source.unsplash.com/kFrdX5IeQzI",
					children: [{ text: "" }],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "This example shows images in action. It features two ways to add images. You can either add an image via the toolbar icon above, or copy an image URL to your clipboard and paste it anywhere in the editor!",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "You can delete images with the cross in the top left. Try deleting this sheep:",
						},
					],
				},
				{
					type: "image",
					url: "https://source.unsplash.com/zOwZKwZOZq8",
					children: [{ text: "" }],
				},
				{ type: "paragraph", children: [{ text: "Check list example" }] },
				{
					type: "check-list-item",
					checked: true,
					children: [{ text: "Slide to the left." }],
				},
				{
					type: "check-list-item",
					checked: true,
					children: [{ text: "Slide to the right." }],
				},
				{
					type: "check-list-item",
					checked: false,
					children: [{ text: "Criss-cross." }],
				},
				{
					type: "check-list-item",
					checked: true,
					children: [{ text: "Criss-cross!" }],
				},
				{
					type: "check-list-item",
					checked: false,
					children: [{ text: "Cha cha real smooth…" }],
				},
				{
					type: "check-list-item",
					checked: false,
					children: [{ text: "Let's go to work!" }],
				},
				{
					type: "paragraph",
					children: [{ text: "Try it out for yourself!" }],
				},
			];
		}
	}, []);

	// store the content in localStorage when changes are made
	const storeContent = (value: Descendant[], editor: EditorType) => {
		// checking if any operation has occured unless text selection
		const isAstChange = editor.operations.some(
			(op) => "set_selection" !== op.type
		);

		// if changed then store it in localStorage
		if (isAstChange) {
			const content = JSON.stringify(value);
			localStorage.setItem("content", content);
		}
	};

	return [content, storeContent] as [
		Descendant[],
		(value: Descendant[], editor: EditorType) => void
	];
};

export default useContent;
