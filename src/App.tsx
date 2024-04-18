import {
	Editable,
	RenderElementProps,
	RenderLeafProps,
	Slate,
	withReact,
} from "slate-react";
import { useCallback, useState } from "react";
import { Descendant, createEditor } from "slate";

import Leaf from "./components/Leaf";
import Toolbar from "./components/Toolbar";
import useContent from "./hooks/useContent";
import CodeElement from "./components/CodeElement";
import DefaultElement from "./components/DefaultElement";
import { CustomEditor } from "./custom-editor/custom-editor";

function App() {
	// to make editor to be stable across renders, we use useState without a setter
	const [editor] = useState(() => withReact(createEditor()));
	const [content, storeContent] = useContent();
	// fetching data from localStorage if available
	const initialValue: Descendant[] = content;

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
				{/* render the slate context, must be rendered above any editable components,
				 it can provide editor state to other components like toolbars, menus */}
				<Slate
					editor={editor}
					initialValue={initialValue}
					// store value to localStorage on change
					onChange={(value) => storeContent(value, editor)}
				>
					{/* Toolbar */}
					<Toolbar editor={editor} />
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

									CustomEditor.toggleCodeBlock(editor);
									break;
								}

								// if "B" is pressed, bold the text in the selection
								case "b": {
									event.preventDefault();
									CustomEditor.toggleBoldMark(editor);
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
