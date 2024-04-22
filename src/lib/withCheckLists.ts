import { Editor, Element, Point, Range, Transforms } from "slate";

// overriding editor method to replace check-list-item with paragraph when deleting backwards
export const withCheckLists = (editor: Editor) => {
	const { deleteBackward } = editor;

	editor.deleteBackward = (...args) => {
		// getting selected state of editor
		const { selection } = editor;

		// if selection is not collapsed
		if (selection && Range.isCollapsed(selection)) {
			// if selected state is check-list-item store get it match
			const [match] = Editor.nodes(editor, {
				match: (n) =>
					!Editor.isEditor(n) &&
					Element.isElement(n) &&
					n.type === "check-list-item",
			});

			// if match found
			if (match) {
				const [, path] = match;

				// start is starting point of check-list-item
				const start = Editor.start(editor, path);

				// if selected state's starting point is same as matched check-list-item's starting point
				if (Point.equals(selection?.anchor, start)) {
					// create a new node
					const newProperties: Partial<Element> = {
						type: "paragraph",
					};

					// insert paragraph node
					Transforms.setNodes(editor, newProperties, {
						match: (n) =>
							!Editor.isEditor(n) &&
							Element.isElement(n) &&
							n.type === "check-list-item",
					});
					return;
				}
			}
		}
		deleteBackward(...args);
	};

	return editor;
};
