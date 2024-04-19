import { useSlate } from "slate-react";
import { Button } from "./Button";
import { CustomEditor, TEXT_ALIGN_TYPES } from "../custom-editor/custom-editor";
import { Icon } from "./Icon";

interface BlockButtonProps {
	format: string;
	icon: string;
}

// button to handler block formatting
const BlockButton: React.FC<BlockButtonProps> = ({ format, icon }) => {
	const editor = useSlate();

	return (
		<Button
			active={CustomEditor.isBlockActive(
				editor,
				format,
				TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
			)}
			onMouseDown={(event: KeyboardEvent) => {
				event.preventDefault();
				CustomEditor.toggleBlock(editor, format);
			}}
		>
			<Icon>{icon}</Icon>
		</Button>
	);
};

export default BlockButton;
