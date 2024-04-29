import { RenderElementProps } from "slate-react";
import { VideoElement } from "../../types";

// element to render video embed
const Video: React.FC<RenderElementProps> = ({
	attributes,
	children,
	element,
}) => {
	const { url } = element as VideoElement;
	return (
		<div {...attributes}>
			<div contentEditable={false}>
				<div className="p-0 w-full relative">
					<iframe
						src={url}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
						className="w-1/2 max-w-full h-80 max-h-80"
					/>
				</div>
			</div>
			{children}
		</div>
	);
};

export default Video;
