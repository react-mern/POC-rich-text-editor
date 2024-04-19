import { useSlate } from "slate-react";

import { Icon } from "./Icon";
import { Button } from "./Button";
import { CustomEditor } from "../custom-editor/custom-editor";

// toolbar button to add link
const AddLinkButton = () => {
	const editor = useSlate();
	return (
		<Button
			active={CustomEditor.link.isLinkActive(editor)}
			onMouseDown={(event: KeyboardEvent) => {
				event?.preventDefault();
				const url = window.prompt("Enter URL of the link");
				if (!url) return;
				CustomEditor.link.insertLink(editor, url);
			}}
		>
			<Icon>link</Icon>
		</Button>
	);
};

export default AddLinkButton;
