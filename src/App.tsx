import {
	Editable,
	RenderElementProps,
	RenderLeafProps,
	Slate,
	withReact,
} from "slate-react";
import { useCallback, useState } from "react";
import isHotkey, { isKeyHotkey } from "is-hotkey";
import { Descendant, Range, Transforms, createEditor } from "slate";

import Leaf from "./components/Leaf";
import Toolbar from "./components/Toolbar";
import useContent from "./hooks/useContent";
import { withInlines } from "./lib/withInlines";
import MarkButton from "./components/MarkButton";
import BlockButton from "./components/BlockButton";
import AddLinkButton from "./components/AddLinkButton";
import DefaultElement from "./components/DefaultElement";
import { CustomEditor } from "./custom-editor/custom-editor";
import RemoveLinkButton from "./components/RemoveLinkButton";

const HOTKEYS: { [key: string]: string } = {
	"mod+b": "bold",
	"mob+i": "italic",
	"mod+u": "underline",
	"mod+`": "code",
};

function App() {
	// to make editor to be stable across renders, we use useState without a setter
	const [editor] = useState(() => withInlines(withReact(createEditor())));
	const [content, storeContent] = useContent();

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
					<Toolbar>
						<MarkButton format="bold" icon="format_bold" />
						<MarkButton format="italic" icon="format_italic" />
						<MarkButton format="underline" icon="format_underlined" />
						<MarkButton format="code" icon="code" />
						<BlockButton format="heading-one" icon="looks_one" />
						<BlockButton format="heading-two" icon="looks_two" />
						<BlockButton format="block-quote" icon="format_quote" />
						<BlockButton format="bulleted-list" icon="format_list_bulleted" />
						<BlockButton format="numbered-list" icon="format_list_numbered" />
						<BlockButton format="left" icon="format_align_left" />
						<BlockButton format="center" icon="format_align_center" />
						<BlockButton format="right" icon="format_align_right" />
						<BlockButton format="justify" icon="format_align_justify" />
						<AddLinkButton />
						<RemoveLinkButton />
					</Toolbar>
					{/* editable component */}
					<div className="p-3 focus-within:ring-2 focus-within:ring-neutral-200 focus-within:ring-inset border">
						<Editable
							spellCheck
							autoFocus
							className="h-[50vh] outline-none"
							renderElement={renderElement}
							renderLeaf={renderLeaf}
							// when user inputs &, change it to 'and'
							onKeyDown={(event) => {
								if (!event.ctrlKey) return false;
								for (const hotkey in HOTKEYS) {
									if (isHotkey(hotkey, event)) {
										event.preventDefault();
										const mark = HOTKEYS[hotkey];
										CustomEditor.toggleMark(editor, mark);
									}
								}

								const { selection } = editor;
								if (selection && Range.isCollapsed(selection)) {
									const { nativeEvent } = event;
									if (isKeyHotkey("left", nativeEvent)) {
										event.preventDefault();
										Transforms.move(editor, { unit: "offset", reverse: true });
										return;
									}

									if (isKeyHotkey("right", nativeEvent)) {
										event.preventDefault();
										Transforms.move(editor, { unit: "offset" });
										return;
									}
								}
							}}
						/>
					</div>
				</Slate>
			</div>
		</div>
	);
}

export default App;
