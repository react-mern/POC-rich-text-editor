import { useSlate } from "slate-react";

import { Icon } from "../common/Icon";
import Tooltip from "../common/Tooltip";
import { Button } from "../common/Button";
import { CustomEditor } from "../../custom-editor/custom-editor";

// button to add editable button
const ToggleEditableButton = () => {
	const editor = useSlate();
	return (
		<Tooltip message="toggle-editable-button">
			<Button
				active={CustomEditor.editableButton.isButtonActive(editor)}
				onMouseDown={(event: MouseEvent) => {
					event.preventDefault();
					if (CustomEditor.editableButton.isButtonActive(editor)) {
						CustomEditor.editableButton.unwrapButton(editor);
					} else {
						CustomEditor.editableButton.insertButton(editor);
					}
				}}
			>
				<Icon>smart_button</Icon>
			</Button>
		</Tooltip>
	);
};

export default ToggleEditableButton;
