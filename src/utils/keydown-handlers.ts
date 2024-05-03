import isHotkey, { isKeyHotkey } from "is-hotkey";
import { Editor, Range, Transforms } from "slate";

import { CustomEditor } from "../custom-editor/custom-editor";

export const HOTKEYS: { [key: string]: string } = {
	"mod+b": "bold",
	"mob+i": "italic",
	"mod+u": "underline",
	"mod+`": "code",
};

// toggling mark methods from keyboard directly
export const toggleMarkFromKb = (
	event: React.KeyboardEvent<HTMLDivElement>,
	editor: Editor
) => {
	if (!event.ctrlKey) return false;
	for (const hotkey in HOTKEYS) {
		if (isHotkey(hotkey, event)) {
			event.preventDefault();
			const mark = HOTKEYS[hotkey];
			CustomEditor.mark.toggleMark(editor, mark);
		}
	}
};

// allowing users to set cursor outside badge
export const modifyInlineCursor = (
	event: React.KeyboardEvent<HTMLDivElement>,
	editor: Editor
) => {
	const { selection } = editor;

	// check for selection in editor
	if (selection && Range.isCollapsed(selection)) {
		const { nativeEvent } = event;

		// move cursor outside badge element on left
		if (isKeyHotkey("left", nativeEvent)) {
			event.preventDefault();
			Transforms.move(editor, { unit: "offset", reverse: true });
			return;
		}

		// move cursor outside badge element on right
		if (isKeyHotkey("right", nativeEvent)) {
			event.preventDefault();
			Transforms.move(editor, { unit: "offset" });
			return;
		}
	}
};

// function to select all text
export const selectText = (
	event: React.KeyboardEvent<HTMLDivElement>,
	editor: Editor
) => {
	if (isHotkey("mod+a", event)) {
		event.preventDefault();
		Transforms.select(editor, []);
	}
};
