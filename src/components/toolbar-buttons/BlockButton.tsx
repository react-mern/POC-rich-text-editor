import { useSlate } from "slate-react";

import { Icon } from "../common/Icon";
import { Button } from "../common/Button";
import { TEXT_ALIGN_TYPES } from "../../custom-editor/block";
import { CustomEditor } from "../../custom-editor/custom-editor";

interface BlockButtonProps {
	format: string;
	icon: string;
}

// button to handler block formatting
const BlockButton: React.FC<BlockButtonProps> = ({ format, icon }) => {
	const editor = useSlate();

	return (
		<Button
			active={CustomEditor.block.isBlockActive(
				editor,
				format,
				TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
			)}
			onMouseDown={(event: MouseEvent) => {
				event.preventDefault();
				CustomEditor.block.toggleBlock(editor, format);
			}}
		>
			<Icon>{icon}</Icon>
		</Button>
	);
};

export default BlockButton;
