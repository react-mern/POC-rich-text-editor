import { forwardRef, PropsWithChildren, Ref } from "react";

import { BaseProps } from "../../../types";

// components to for menu which consists formatting buttons
const Menu = forwardRef(
	(
		{ className, ...props }: PropsWithChildren<BaseProps>,
		ref: Ref<HTMLDivElement>
	) => {
		return (
			<div
				{...props}
				data-text-id="menu"
				ref={ref}
				className={`${className} gap-3 flex items-center flex-wrap py-2`}
			/>
		);
	}
);

export default Menu;
