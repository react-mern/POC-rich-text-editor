import { RenderElementProps, useSelected } from "slate-react";

// component to return block html elements
const Element: React.FC<RenderElementProps> = ({
	attributes,
	children,
	element,
}) => {
	const selected = useSelected();

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
		case "button":
			return (
				<span
					{...attributes}
					onClick={(event) => event.preventDefault()}
					className="my-0 mx-1 bg-neutral-200 py-0.5 px-1 border rounded-md text-base"
				>
					{children}
				</span>
			);
		case "badge":
			return (
				<span
					{...attributes}
					contentEditable={false}
					className={`bg-green-500 text-white py-0.5 px-1 rounded-md text-base ${selected}`}
				>
					{children}
				</span>
			);
		default:
			return <p {...attributes}>{children}</p>;
	}
};

export default Element;
