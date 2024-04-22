import {
	ReactEditor,
	RenderElementProps,
	useFocused,
	useSelected,
	useSlateStatic,
} from "slate-react";
import { Button } from "../common/Button";
import { Icon } from "../common/Icon";
import { Transforms } from "slate";

const Image: React.FC<RenderElementProps> = ({
	attributes,
	children,
	element,
}) => {
	const editor = useSlateStatic();

	// getting path of the node in the editor
	const path = ReactEditor.findPath(editor, element);

	// getting currently selected state of an element
	const selected = useSelected();

	// getting the current focused state of editor
	const focused = useFocused();
	return (
		<div {...attributes}>
			{children}
			<div contentEditable={false} className="relative">
				{element.type === "image" && (
					<img
						src={element.url}
						className={`block max-w-full max-h-80 ${
							selected && focused ? "shadow-xl" : "none"
						}`}
					/>
				)}
				{/* button to delete the image */}
				<Button
					active
					onClick={() =>
						Transforms.removeNodes(editor, {
							at: path,
						})
					}
					className={`absolute top-2 left-2`}
				>
					<Icon>delete</Icon>
				</Button>
			</div>
		</div>
	);
};

export default Image;
