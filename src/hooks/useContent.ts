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
