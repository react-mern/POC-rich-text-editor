import { useSlate } from "slate-react";

import { Icon } from "../common/Icon";
import Tooltip from "../common/Tooltip";
import { Button } from "../common/Button";
import { CustomEditor } from "../../custom-editor/custom-editor";

// toolbar button to add link
const AddLinkButton = () => {
	const editor = useSlate();
	return (
		<Tooltip message="add-link">
			<Button
				// active state of button
				active={CustomEditor.link.isLinkActive(editor)}
				// prompt for link then insert link
				onMouseDown={(event: MouseEvent) => {
					event?.preventDefault();
					const url = window.prompt("Enter URL of the link");
					if (!url) return;
					CustomEditor.link.insertLink(editor, url);
				}}
			>
				<Icon>link</Icon>
			</Button>
		</Tooltip>
	);
};

export default AddLinkButton;
