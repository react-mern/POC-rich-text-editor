import { useSlateStatic } from "slate-react";

import { Icon } from "../common/Icon";
import Tooltip from "../common/Tooltip";
import { Button } from "../common/Button";
import { CustomEditor } from "../../custom-editor/custom-editor";

// button to insert images
const InsertImageButton = () => {
	const editor = useSlateStatic();
	return (
		<Tooltip message="insert-image">
			<Button
				onMouseDown={(event: MouseEvent) => {
					event.preventDefault();

					// prompt for image url
					const url = window.prompt("Enter url of the image:");

					// if not valid image url, alert error
					if (url && !CustomEditor.image.isImageUrl(url)) {
						alert("URL is not an image");
						return;
					}

					// insert image in editor
					url && CustomEditor.image.insertImage(editor, url);
				}}
			>
				<Icon>image</Icon>
			</Button>
		</Tooltip>
	);
};

export default InsertImageButton;
