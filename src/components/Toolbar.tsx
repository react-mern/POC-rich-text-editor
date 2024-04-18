import { CustomEditor } from "../custom-editor/custom-editor";
import { type Editor as EditorType } from "slate";

interface ToolbarProps {
	editor: EditorType;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
	return (
		<div>
			<button
				onMouseDown={(event) => {
					event.preventDefault();
					CustomEditor.toggleBoldMark(editor);
				}}
			>
				Bold
			</button>
			<button
				onMouseDown={(event) => {
					event.preventDefault();
					CustomEditor.toggleCodeBlock(editor);
				}}
			>
				Code block
			</button>
		</div>
	);
};

export default Toolbar;
