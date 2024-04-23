import { useSlateStatic } from "slate-react";
import { Button } from "../common/Button";
import { Icon } from "../common/Icon";
import { CustomEditor } from "../../custom-editor/custom-editor";

const EmbedVideoButton = () => {
	const editor = useSlateStatic();

	return (
		<Button
			onMouseDown={(event: MouseEvent) => {
				event.preventDefault();
				const url = window.prompt(
					"Enter URL of embed (supports youtube currently):"
				);
				if (url && CustomEditor.embedVideo.isVideoURL(url)) {
					const embedUrl = CustomEditor.embedVideo.getEmbedURL(url);
					url && CustomEditor.embedVideo.insertEmbedVideo(editor, embedUrl);
				} else {
					alert("URL is not an video embed");
				}
			}}
		>
			<Icon>data_object</Icon>
		</Button>
	);
};

export default EmbedVideoButton;
