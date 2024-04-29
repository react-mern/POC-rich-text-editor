import { RenderElementProps } from "slate-react";

import { BadgeElement } from "../../types";

const Badge: React.FC<RenderElementProps> = ({
	attributes,
	children,
	element,
}) => {
	// display badge color according to tag
	const colorMap = {
		success: "bg-green-500",
		error: "bg-red-500",
		info: "bg-yellow-500",
	};

	const { variant } = element as BadgeElement;
	const color = colorMap[variant];
	return (
		<span
			{...attributes}
			onClick={(event) => event.preventDefault()}
			className={`${color} text-white py-0.5 px-1 rounded-md text-base`}
		>
			{children}
		</span>
	);
};

export default Badge;
