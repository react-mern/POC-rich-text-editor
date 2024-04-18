import { RenderElementProps } from "slate-react";

const CodeElement: React.FC<RenderElementProps> = (props) => {
	return (
		<pre {...props.attributes}>
			<code>{props.children}</code>
		</pre>
	);
};

export default CodeElement;
