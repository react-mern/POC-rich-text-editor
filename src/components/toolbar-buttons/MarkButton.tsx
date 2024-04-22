import { useSlate } from "slate-react";

import { Icon } from "../common/Icon";
import { Button } from "../common/Button";
import { CustomEditor } from "../../custom-editor/custom-editor";

interface MarkButtonProps {
	format: string;
	icon: string;
}

// button to perform mark formatting
const MarkButton: React.FC<MarkButtonProps> = ({ format, icon }) => {
	const editor = useSlate();
	return (
		<Button
			active={CustomEditor.mark.isMarkActive(editor, format)}
			onMouseDown={(event: MouseEvent) => {
				event.preventDefault();
				CustomEditor.mark.toggleMark(editor, format);
			}}
		>
			<Icon>{icon}</Icon>
		</Button>
	);
};

export default MarkButton;
