import { useMemo } from "react";
import { Descendant, type Editor as EditorType } from "slate";

const useContent = () => {
	const content: Descendant[] = useMemo(() => {
		const storedContent = localStorage.getItem("content");
		if (storedContent) {
			return JSON.parse(storedContent);
		} else {
			return [
				{
					type: "paragraph",
					children: [
						{
							text: "A line of text in a paragraph",
						},
					],
				},
			];
		}
	}, []);

	const storeContent = (value: Descendant[], editor: EditorType) => {
		const isAstChange = editor.operations.some(
			(op) => "set_selection" !== op.type
		);
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
