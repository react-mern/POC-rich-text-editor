import { RenderLeafProps } from "slate-react";

const Leaf: React.FC<RenderLeafProps> = (props) => {
	return (
		// leaves must be inline that's why span tag is used
		<span
			{...props.attributes}
			style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
		>
			{props.children}
		</span>
	);
};

export default Leaf;
