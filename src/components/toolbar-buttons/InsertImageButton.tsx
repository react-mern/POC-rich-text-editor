import { useSlateStatic } from "slate-react";
import { Button } from "../common/Button";
import { Icon } from "../common/Icon";
import { CustomEditor } from "../../custom-editor/custom-editor";

const InsertImageButton = () => {
	const editor = useSlateStatic();
	return (
		<Button
			onMouseDown={(event: MouseEvent) => {
				event.preventDefault();
				const url = window.prompt("Enter url of the image:");
				if (url && !CustomEditor.image.isImageUrl(url)) {
					alert("URL is not an image");
					return;
				}

				url && CustomEditor.image.insertImage(editor, url);
			}}
		>
			<Icon>image</Icon>
		</Button>
	);
};

export default InsertImageButton;
