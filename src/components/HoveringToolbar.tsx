import { useEffect, useRef } from "react";
import { Editor, Range } from "slate";
import { useFocused, useSlate } from "slate-react";
import Portal from "./common/Portal";
import Menu from "./common/Menu";
import MarkButton from "./toolbar-buttons/MarkButton";

// component for a hovering toolbar
const HoveringToolbar = () => {
	// to attach a ref to hovering toolbar
	const ref = useRef<HTMLDivElement | null>(null);

	// getting current editor state
	const editor = useSlate();

	// getting currently focused state of editor
	const inFocus = useFocused();

	// to display editor when text is selected
	useEffect(() => {
		// ref element
		const element = ref.current;

		// getting current selection
		const { selection } = editor;

		if (!element) {
			return;
		}

		// if not selected, not in focus, text selection get 0, then remove style attribute
		if (
			!selection ||
			!inFocus ||
			Range.isCollapsed(selection) ||
			Editor.string(editor, selection) === ""
		) {
			element.removeAttribute("style");
			return;
		}

		// getting currently selected text
		const domSelection = window.getSelection();

		// creating range of selected text
		const domRange = domSelection?.getRangeAt(0);
		const rect = domRange?.getBoundingClientRect();

		// defining position for hovering toolbar
		if (rect) {
			element.style.opacity = "1";
			element.style.top = `${
				rect.top + window.scrollY - element.offsetHeight
			}px`;
			element.style.left = `${
				rect.left + window.scrollX - element.offsetWidth / 2 + rect.width / 2
			}px`;
		}
	});
	return (
		<Portal>
			<Menu
				ref={ref}
				className="py-2 px-2 absolute z-10 -top-[10000px] -left-[10000px] -mt-2 opacity-0 bg-neutral-50 border rounded-md transition"
				onMouseDown={(e: MouseEvent) => {
					// prevent toolbar from taking focus away from editor
					e.preventDefault();
				}}
			>
				<MarkButton format="bold" icon="format_bold" />
				<MarkButton format="italic" icon="format_italic" />
				<MarkButton format="underlined" icon="format_underlined" />
				<MarkButton format="code" icon="code" />
			</Menu>
		</Portal>
	);
};

export default HoveringToolbar;
