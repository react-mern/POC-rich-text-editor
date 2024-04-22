import {
	ReactEditor,
	RenderElementProps,
	useReadOnly,
	useSlateStatic,
} from "slate-react";
import { CheckListItemElement } from "../../types";
import { Element, Transforms } from "slate";

// component to render check list item
const CheckListItem: React.FC<RenderElementProps> = ({
	attributes,
	children,
	element,
}) => {
	// getting current editor
	const editor = useSlateStatic();

	// getting current read only state
	const readOnly = useReadOnly();

	// checked state of list item
	const { checked } = element as CheckListItemElement;
	return (
		<div {...attributes} className="flex flex-row items-center mt-0">
			<span contentEditable={false} className="mr-4">
				{/* checklist checkbox */}
				<input
					className="cursor-pointer"
					type="checkbox"
					onChange={(event) => {
						const path = ReactEditor.findPath(editor, element);
						const newProperties: Partial<Element> = {
							checked: event.target.checked,
						};
						Transforms.setNodes(editor, newProperties, { at: path });
					}}
				/>
			</span>

			{/* list item */}
			<span
				contentEditable={!readOnly}
				suppressContentEditableWarning
				className={`flex-1 ${checked ? "opacity-70" : "opacity-100"} ${
					!checked ? "no-underline" : "line-through"
				}`}
			>
				{children}
			</span>
		</div>
	);
};

export default CheckListItem;
