import { useState } from "react";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";

const initialValue = [
	{
		type: "paragraph",
		children: [{ text: "A line of text in a paragraph" }],
	},
];

function App() {
	// to make editor to be stable across renders, we use useState without a setter
	const [editor] = useState(() => withReact(createEditor()));

	// render the slate context, must be rendered above any editable components, it can provide editor state to other components like toolbars, menus
	return (
		<div className="bg-sky-200 h-screen flex items-center justify-center">
			<div className="bg-white container mx-auto rounded-md">
				<Slate editor={editor} initialValue={initialValue}>
					{/* editable component */}
					<Editable />
				</Slate>
			</div>
		</div>
	);
}

export default App;
