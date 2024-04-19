import { useSlate } from "slate-react";
import { Button } from "./Button";
import { CustomEditor } from "../custom-editor/custom-editor";
import { Icon } from "./Icon";

interface MarkButtonProps {
	format: string;
	icon: string;
}

// button to perform mark formatting
const MarkButton: React.FC<MarkButtonProps> = ({ format, icon }) => {
	const editor = useSlate();
	return (
		<Button
			active={CustomEditor.isMarkActive(editor, format)}
			onMouseDown={(event: KeyboardEvent) => {
				event.preventDefault();
				CustomEditor.toggleMark(editor, format);
			}}
		>
			<Icon>{icon}</Icon>
		</Button>
	);
};

export default MarkButton;
