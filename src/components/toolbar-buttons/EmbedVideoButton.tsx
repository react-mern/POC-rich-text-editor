import { useSlateStatic } from "slate-react";

import { Icon } from "../common/Icon";
import Tooltip from "../common/Tooltip";
import { Button } from "../common/Button";
import { CustomEditor } from "../../custom-editor/custom-editor";

// button to handle embed insertion
const EmbedVideoButton = () => {
	const editor = useSlateStatic();

	return (
		<Tooltip message="embed-youtube">
			<Button
				onMouseDown={(event: MouseEvent) => {
					event.preventDefault();
					const url = window.prompt(
						"Enter URL of embed (supports youtube currently):"
					);
					// if user has entered url
					if (url) {
						// if url is for youtube
						if (CustomEditor.embedVideo.isVideoURL(url)) {
							// generate embed url
							const embedUrl = CustomEditor.embedVideo.getEmbedURL(url);

							// insert embed in editor
							url && CustomEditor.embedVideo.insertEmbedVideo(editor, embedUrl);
						} else {
							alert("URL is not an video embed");
						}
					}
				}}
			>
				<Icon>data_object</Icon>
			</Button>
		</Tooltip>
	);
};

export default EmbedVideoButton;
