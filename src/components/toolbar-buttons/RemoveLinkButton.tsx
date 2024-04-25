import { useSlate } from "slate-react";

import { Icon } from "../common/Icon";
import Tooltip from "../common/Tooltip";
import { Button } from "../common/Button";
import { CustomEditor } from "../../custom-editor/custom-editor";

// toolbar button to remove link
const RemoveLinkButton = () => {
	const editor = useSlate();
	return (
		<Tooltip message="remove-link">
			<Button
				active={CustomEditor.link.isLinkActive(editor)}
				onMouseDown={() => {
					if (CustomEditor.link.isLinkActive(editor)) {
						CustomEditor.link.unwrapLink(editor);
					}
				}}
			>
				<Icon>link_off</Icon>
			</Button>
		</Tooltip>
	);
};

export default RemoveLinkButton;
