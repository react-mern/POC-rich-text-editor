import {
	Editable,
	RenderElementProps,
	RenderLeafProps,
	Slate,
} from "slate-react";
import { useCallback, useState } from "react";
import { Editor, Descendant, NodeEntry, Text, Path } from "slate";

import {
	modifyInlineCursor,
	selectText,
	toggleMarkFromKb,
} from "../utils/keydown-handlers";
import Toolbar from "./Toolbar";
import useContent from "../hooks/useContent";
import HoveringToolbar from "./HoveringToolbar";
import MarkButton from "./toolbar-buttons/MarkButton";
import BlockButton from "./toolbar-buttons/BlockButton";
import SearchInput from "./toolbar-buttons/SearchInput";
import AddLinkButton from "./toolbar-buttons/AddLinkButton";
import { CustomEditor } from "../custom-editor/custom-editor";
import EmbedVideoButton from "./toolbar-buttons/EmbedVideoButton";
import RemoveLinkButton from "./toolbar-buttons/RemoveLinkButton";
import InsertImageButton from "./toolbar-buttons/InsertImageButton";
import InsertBadgeButton from "./toolbar-buttons/InsertBadgeButton";
import ToggleEditableButton from "./toolbar-buttons/ToggleEditableButton";

interface EditorProps {
	initialValue: Descendant[];
	editor: Editor;
	renderElement: (props: RenderElementProps) => JSX.Element;
	renderLeaf: (props: RenderLeafProps) => JSX.Element;
}

type Range = {
	anchor: {
		path: Path;
		offset: number;
	};
	focus: { path: Path; offset: number };
	highlight: boolean;
};

type Ranges = Range[];

const EditorComponent: React.FC<EditorProps> = ({
	editor,
	initialValue,
	renderElement,
	renderLeaf,
}) => {
	// to store content in localStorage
	const [, storeContent] = useContent();

	// state to store input text
	const [search, setSearch] = useState<string | undefined>("");

	// function to decorate searched text
	const decorate = useCallback(
		([node, path]: NodeEntry) => {
			const ranges: Ranges = [];
			// if user has searched text and the node corresponds to text
			if (search && Text.isText(node)) {
				// extracting text from node
				const { text } = node;

				// splitting text according to searched text
				const parts = text.split(search);
				let offset = 0;

				// iterating over parts	and pushing positions to ranges for highlighting using anchor and focus
				parts.forEach((part, i) => {
					if (i !== 0) {
						// adding positions tof searched text to highlight
						ranges.push({
							anchor: { path, offset: offset - search.length },
							focus: { path, offset },
							highlight: true,
						});
					}

					// we skip the first part and add the offset the length of part, length of searched text to offset
					offset = offset + part.length + search.length;
				});
			}
			return ranges;
		},
		[search]
	);

	return (
		//  render the slate context, must be rendered above any editable components,
		//  it can provide editor state to other components like toolbars, menus
		<Slate
			editor={editor}
			initialValue={initialValue}
			// store value to localStorage on change
			onChange={(value) => storeContent(value, editor)}
		>
			{/* Toolbar */}
			<Toolbar>
				{/* Mark buttons */}
				<div className="flex flex-row gap-x-3 border-r pr-2">
					<MarkButton format="bold" icon="format_bold" />
					<MarkButton format="italic" icon="format_italic" />
					<MarkButton format="underline" icon="format_underlined" />
					<MarkButton format="code" icon="code" />
				</div>
				{/* Block buttons */}
				<div className="flex flex-row gap-x-3 border-r pr-2">
					<BlockButton format="heading-one" icon="looks_one" />
					<BlockButton format="heading-two" icon="looks_two" />
					<BlockButton format="block-quote" icon="format_quote" />
				</div>
				{/* List buttons */}
				<div className="flex flex-row gap-x-3 border-r pr-2">
					<BlockButton format="bulleted-list" icon="format_list_bulleted" />
					<BlockButton format="numbered-list" icon="format_list_numbered" />
					<BlockButton format="check-list-item" icon="check_box" />
				</div>
				{/* Alignment buttons */}
				<div className="flex flex-row gap-x-3 border-r pr-2">
					<BlockButton format="left" icon="format_align_left" />
					<BlockButton format="center" icon="format_align_center" />
					<BlockButton format="right" icon="format_align_right" />
					<BlockButton format="justify" icon="format_align_justify" />
				</div>
				{/* Link, embed buttons */}
				<div className="flex flex-row gap-x-3 border-r pr-2">
					<AddLinkButton />
					<RemoveLinkButton />
					<EmbedVideoButton />
				</div>
				{/* Inline button, badge, Image buttons */}
				<div className="flex flex-row gap-x-3 border-r pr-2">
					<ToggleEditableButton />
					<InsertBadgeButton />
					<InsertImageButton />
				</div>
				{/* Search input */}
				<div className="flex flex-row gap-x-3 border-r pr-2">
					<SearchInput setSearch={setSearch} />
				</div>
			</Toolbar>
			<HoveringToolbar />
			{/* editable component */}
			<div className="p-3 focus-within:ring-2 focus-within:ring-neutral-200 focus-within:ring-inset border">
				<Editable
					spellCheck
					autoFocus
					className="outline-none max-h-[730px] overflow-y-auto"
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					decorate={decorate}
					onKeyDown={(event) => {
						// adding formatting using keyboard shortcuts
						toggleMarkFromKb(event, editor);

						// modifying cursor for inline elements
						modifyInlineCursor(event, editor);

						// select text using keyboard shortcut
						selectText(event, editor);
					}}
					onDOMBeforeInput={(event: InputEvent) => {
						switch (event.inputType) {
							case "fomartBold":
								event.preventDefault();
								return CustomEditor.mark.toggleMark(editor, "bold");
							case "formatItalic":
								event.preventDefault();
								return CustomEditor.mark.toggleMark(editor, "italic");
							case "formatUnderline":
								event.preventDefault();
								return CustomEditor.mark.toggleMark(editor, "underlined");
						}
					}}
				/>
			</div>
		</Slate>
	);
};

export default EditorComponent;
