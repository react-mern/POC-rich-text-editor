import { useCallback, useState } from "react";
import { Descendant, Editor, Element, Transforms, createEditor } from "slate";
import {
	Editable,
	RenderElementProps,
	RenderLeafProps,
	Slate,
	withReact,
} from "slate-react";
import CodeElement from "./components/CodeElement";
import DefaultElement from "./components/DefaultElement";
import Leaf from "./components/Leaf";

const initialValue: Descendant[] = [
	{
		type: "paragraph",
		children: [{ text: "A line of text in a paragraph" }],
	},
];

function App() {
	// to make editor to be stable across renders, we use useState without a setter
	const [editor] = useState(() => withReact(createEditor()));

	// defining a rendering function based on the element passed to 'props', useCallback here to memoize the function for subsequent renders.
	const renderElement = useCallback((props: RenderElementProps) => {
		switch (props.element.type) {
			case "code":
				return <CodeElement {...props} />;
			default:
				return <DefaultElement {...props} />;
		}
	}, []);

	// a memoized leaf rendering function
	const renderLeaf = useCallback((props: RenderLeafProps) => {
		return <Leaf {...props} />;
	}, []);

	return (
		<div className="bg-sky-200 h-screen flex items-center justify-center">
			<div className="bg-white container mx-auto rounded-md">
				{/* render the slate context, must be rendered above any editable components, it can provide editor state to other components like toolbars, menus */}
				<Slate editor={editor} initialValue={initialValue}>
					{/* editable component */}
					<Editable
						renderElement={renderElement}
						renderLeaf={renderLeaf}
						// when user inputs &, change it to 'and'
						onKeyDown={(event) => {
							if (event.key === "&") {
								event.preventDefault();
								editor.insertText("and");
							}

							if (!event.ctrlKey) {
								return;
							}
							switch (event.key) {
								// if "`" is pressed, change mode to code and vice verse
								case "`": {
									event.preventDefault();

									// determin whether any of currently selected blocks are code blocks
									const [match] = Editor.nodes(editor, {
										match: (n) => Element.isElement(n) && n.type === "code",
									});

									// toggle the block type depending on whether there's already a match
									Transforms.setNodes(
										editor,
										{ type: match ? "paragraph" : "code" },
										{
											match: (n) =>
												Element.isElement(n) && Editor.isBlock(editor, n),
										}
									);
									break;
								}

								// if "B" is pressed, bold the text in the selection
								case "b": {
									event.preventDefault();
									Editor.addMark(editor, "bold", true);
									break;
								}
							}
						}}
					/>
				</Slate>
			</div>
		</div>
	);
}

export default App;
