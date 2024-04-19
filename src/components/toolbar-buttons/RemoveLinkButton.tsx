import { useSlate } from "slate-react";

import { Icon } from "../common/Icon";
import { Button } from "../common/Button";
import { CustomEditor } from "../../custom-editor/custom-editor";

// toolbar button to remove link
const RemoveLinkButton = () => {
	const editor = useSlate();
	return (
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
	);
};

export default RemoveLinkButton;
