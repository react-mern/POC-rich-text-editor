import { useCallback, useState } from "react";
import { Descendant, createEditor } from "slate";
import { RenderElementProps, RenderLeafProps, withReact } from "slate-react";

import Leaf from "./components/Leaf";
import { withHtml } from "./lib/withHtml";
import useContent from "./hooks/useContent";
import { withImages } from "./lib/withImages";
import { withInlines } from "./lib/withInlines";
import EditorComponent from "./components/Editor";
import DefaultElement from "./components/DefaultElement";

function App() {
	// to make editor to be stable across renders, we use useState without a setter
	const [editor] = useState(() =>
		withHtml(withInlines(withImages(withReact(createEditor()))))
	);
	const [content] = useContent();

	// fetching data from localStorage if available
	const initialValue: Descendant[] = content;

	// defining a rendering function based on the element passed to 'props',
	// useCallback here to memoize the function for subsequent renders.
	const renderElement = useCallback((props: RenderElementProps) => {
		return <DefaultElement {...props} />;
	}, []);

	// a memoized leaf rendering function
	const renderLeaf = useCallback((props: RenderLeafProps) => {
		return <Leaf {...props} />;
	}, []);

	return (
		<div className="bg-sky-200 flex flex-col">
			<div className="bg-white container mx-auto rounded-md my-10">
				{/* render the slate context, must be rendered above any editable components,
				 it can provide editor state to other components like toolbars, menus */}
				<EditorComponent
					initialValue={initialValue}
					editor={editor}
					renderElement={renderElement}
					renderLeaf={renderLeaf}
				/>
			</div>
		</div>
	);
}

export default App;
