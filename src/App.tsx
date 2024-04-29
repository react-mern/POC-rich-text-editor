import { createEditor } from "slate";
import { useCallback, useState } from "react";
import { RenderElementProps, RenderLeafProps, withReact } from "slate-react";

import Leaf from "./components/Leaf";
import useContent from "./hooks/useContent";
import EditorComponent from "./components/Editor";
import DefaultElement from "./components/DefaultElement";
import { withCustomFeatures } from "./lib/withCustomFeatures";

function App() {
	// to make editor to be stable across renders, we use useState without a setter
	// for more reference
	const [editor] = useState(() =>
		withCustomFeatures(withReact(createEditor()))
	);

	// getting editor content
	const [content] = useContent();

	// defining a rendering function based on the element passed to 'props',
	// useCallback here to memoize the function for subsequent renders.
	// this will render our custom elements according to props
	const renderElement = useCallback((props: RenderElementProps) => {
		return <DefaultElement {...props} />;
	}, []);

	// a memoized leaf rendering function
	// this will render custom leaf elements according to props
	const renderLeaf = useCallback((props: RenderLeafProps) => {
		return <Leaf {...props} />;
	}, []);

	return (
		<div className="bg-sky-200 flex flex-col h-screen">
			<div className="bg-white container mx-auto rounded-md my-10">
				<EditorComponent
					initialValue={content}
					editor={editor}
					renderElement={renderElement}
					renderLeaf={renderLeaf}
				/>
			</div>
		</div>
	);
}

export default App;
