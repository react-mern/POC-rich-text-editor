import { useSlate } from "slate-react";

import { Icon } from "../common/Icon";
import { Button } from "../common/Button";
import { CustomEditor } from "../../custom-editor/custom-editor";

const ToggleEditableButton = () => {
	const editor = useSlate();
	return (
		<Button
			active
			onMouseDown={(event: KeyboardEvent) => {
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
	);
};

export default ToggleEditableButton;
