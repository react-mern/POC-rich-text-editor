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
					type: "paragraph",
					align: "center",
					children: [{ text: "Try it out for yourself!" }],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "There are two ways to add links. You can either add a link via the toolbar icon above, or if you want in on a little secret, copy a URL to your keyboard and paste it while a range of text is selected. ",
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