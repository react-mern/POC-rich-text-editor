import { RenderElementProps } from "slate-react";
import { VideoElement } from "../../types";

const Video: React.FC<RenderElementProps> = ({
	attributes,
	children,
	element,
}) => {
	const { url } = element as VideoElement;
	return (
		<div {...attributes}>
			<div contentEditable={false}>
				<div className="p-0 pt-[75%] relative">
					<iframe
						src={url}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
						className="absolute top-0 left-0 max-w-full max-h-80"
					/>
				</div>
			</div>
			{children}
		</div>
	);
};

export default Video;
