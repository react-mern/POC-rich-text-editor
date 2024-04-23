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
	const [, storeContent] = useContent();

	// search input state
	const [search, setSearch] = useState<string | undefined>("");

	// function to decorate searched text
	const decorate = useCallback(
		([node, path]: NodeEntry) => {
			const ranges: Ranges = [];
			// if search text and node implement Text interface
			if (search && Text.isText(node)) {
				// extracting text from node
				const { text } = node;

				// splitting text according to search
				const parts = text.split(search);
				let offset = 0;

				parts.forEach((part, i) => {
					// adding parts to ranges for highlighting using anchor and focus
					if (i !== 0) {
						ranges.push({
							anchor: { path, offset: offset - search.length },
							focus: { path, offset },
							highlight: true,
						});
					}

					offset = offset + part.length + search.length;
				});
			}
			return ranges;
		},
		[search]
	);

	return (
		<Slate
			editor={editor}
			initialValue={initialValue}
			// store value to localStorage on change
			onChange={(value) => storeContent(value, editor)}
		>
			{/* Toolbar */}
			<Toolbar>
				<div className="flex flex-row gap-x-3 border-r pr-2">
					<MarkButton format="bold" icon="format_bold" />
					<MarkButton format="italic" icon="format_italic" />
					<MarkButton format="underline" icon="format_underlined" />
					<MarkButton format="code" icon="code" />
				</div>
				<div className="flex flex-row gap-x-3 border-r pr-2">
					<BlockButton format="heading-one" icon="looks_one" />
					<BlockButton format="heading-two" icon="looks_two" />
					<BlockButton format="block-quote" icon="format_quote" />
				</div>
				<div className="flex flex-row gap-x-3 border-r pr-2">
					<BlockButton format="bulleted-list" icon="format_list_bulleted" />
					<BlockButton format="numbered-list" icon="format_list_numbered" />
					<BlockButton format="check-list-item" icon="check_box" />
				</div>
				<div className="flex flex-row gap-x-3 border-r pr-2">
					<BlockButton format="left" icon="format_align_left" />
					<BlockButton format="center" icon="format_align_center" />
					<BlockButton format="right" icon="format_align_right" />
					<BlockButton format="justify" icon="format_align_justify" />
				</div>
				<div className="flex flex-row gap-x-3 border-r pr-2">
					<AddLinkButton />
					<RemoveLinkButton />
					<ToggleEditableButton />
					<InsertBadgeButton />
					<InsertImageButton />
				</div>
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
					className="outline-none"
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					decorate={decorate}
					// when user inputs &, change it to 'and'
					onKeyDown={(event) => {
						toggleMarkFromKb(event, editor);

						modifyInlineCursor(event, editor);

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
