import { createEditor } from "slate";
import { useCallback, useMemo } from "react";
import { RenderElementProps, RenderLeafProps, withReact } from "slate-react";

import Leaf from "./components/Leaf";
import Title from "./components/Title";
import Element from "./components/Element";
import EditorComponent from "./components/Editor";
import { withCustomFeatures } from "./lib/withCustomFeatures";
import NavigationSidebar from "./components/NavigationSidebar";

function App() {
	// to make editor to be stable across renders, we use useMemo hook and create an editor
	// which is wrapped by reactEditor to work it with react
	// and again wrapped by our withCustomFeatures plugin to provide additional features
	const editor = useMemo(
		() => withCustomFeatures(withReact(createEditor())),
		[]
	);

	// defining a rendering function based on the element passed to 'props',
	// useCallback here to memoize the function for subsequent renders.
	// this will render our custom elements according to props
	const renderElement = useCallback((props: RenderElementProps) => {
		return <Element {...props} />;
	}, []);

	// a memoized leaf rendering function
	// this will render custom leaf elements according to props
	const renderLeaf = useCallback((props: RenderLeafProps) => {
		return <Leaf {...props} />;
	}, []);

	return (
		<div className="h-full flex">
			<div className="flex h-screen w-60 flex-col">
				<div className="h-full text-primary w-full bg-white">
					<NavigationSidebar slateEditor={editor} />
				</div>
			</div>
			<main className="w-full">
				<div className="bg-sky-200 flex flex-col h-screen w-full">
					<Title />
					<div className="bg-white mx-auto rounded-md my-10 w-4/5">
						<EditorComponent
							editor={editor}
							renderElement={renderElement}
							renderLeaf={renderLeaf}
						/>
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
