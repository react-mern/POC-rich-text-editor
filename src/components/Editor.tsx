import {
	Editable,
	RenderElementProps,
	RenderLeafProps,
	Slate,
} from "slate-react";
import isHotkey, { isKeyHotkey } from "is-hotkey";
import { Range, Transforms, Editor, Descendant } from "slate";

import Toolbar from "./Toolbar";
import useContent from "../hooks/useContent";
import MarkButton from "./toolbar-buttons/MarkButton";
import BlockButton from "./toolbar-buttons/BlockButton";
import AddLinkButton from "./toolbar-buttons/AddLinkButton";
import { CustomEditor } from "../custom-editor/custom-editor";
import RemoveLinkButton from "./toolbar-buttons/RemoveLinkButton";
import InsertImageButton from "./toolbar-buttons/InsertImageButton";
import ToggleEditableButton from "./toolbar-buttons/ToggleEditableButton";

const HOTKEYS: { [key: string]: string } = {
	"mod+b": "bold",
	"mob+i": "italic",
	"mod+u": "underline",
	"mod+`": "code",
};

interface EditorProps {
	initialValue: Descendant[];
	editor: Editor;
	renderElement: (props: RenderElementProps) => JSX.Element;
	renderLeaf: (props: RenderLeafProps) => JSX.Element;
}

const EditorComponent: React.FC<EditorProps> = ({
	editor,
	initialValue,
	renderElement,
	renderLeaf,
}) => {
	const [, storeContent] = useContent();
	return (
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
				<ToggleEditableButton />
				<InsertImageButton />
			</Toolbar>
			{/* editable component */}
			<div className="p-3 focus-within:ring-2 focus-within:ring-neutral-200 focus-within:ring-inset border">
				<Editable
					spellCheck
					autoFocus
					className="outline-none"
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					// when user inputs &, change it to 'and'
					onKeyDown={(event) => {
						if (!event.ctrlKey) return false;
						for (const hotkey in HOTKEYS) {
							if (isHotkey(hotkey, event)) {
								event.preventDefault();
								const mark = HOTKEYS[hotkey];
								CustomEditor.mark.toggleMark(editor, mark);
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

						if (isHotkey("mod+a", event)) {
							event.preventDefault();
							Transforms.select(editor, []);
						}
					}}
				/>
			</div>
		</Slate>
	);
};

export default EditorComponent;
