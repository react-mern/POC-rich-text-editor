import { RenderElementProps } from "slate-react";

// component to return block html elements
const Element: React.FC<RenderElementProps> = ({
	attributes,
	children,
	element,
}) => {
	switch (element.type) {
		case "block-quote":
			return (
				<blockquote
					style={{ textAlign: element.align }}
					className="p-2 my-2 bg-gray-50 border-l-4 border-gray-900 text-base italic leading-relaxed text-gray-700"
				>
					{children}
				</blockquote>
			);
		case "bulleted-list":
			return (
				<ul
					style={{ textAlign: element.align }}
					{...attributes}
					className="list-disc ml-8"
				>
					{children}
				</ul>
			);
		case "heading-one":
			return (
				<h1
					style={{ textAlign: element.align }}
					{...attributes}
					className="text-2xl my-2"
				>
					{children}
				</h1>
			);
		case "heading-two":
			return (
				<h2
					style={{ textAlign: element.align }}
					{...attributes}
					className="text-xl"
				>
					{children}
				</h2>
			);
		case "list-item":
			return (
				<li {...attributes} style={{ textAlign: element.align }}>
					{children}
				</li>
			);
		case "numbered-list":
			return (
				<ol
					style={{ textAlign: element.align }}
					{...attributes}
					className="list-decimal ml-8"
				>
					{children}
				</ol>
			);
		case "paragraph":
			return (
				<p style={{ textAlign: element.align }} {...attributes}>
					{children}
				</p>
			);
		case "link":
			return (
				<a
					{...attributes}
					href={element.url}
					className="underline text-blue-400"
				>
					{children}
				</a>
			);
		default:
			return <p {...attributes}>{children}</p>;
	}
};

export default Element;
