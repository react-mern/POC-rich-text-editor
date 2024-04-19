import { forwardRef, PropsWithChildren, Ref } from "react";
import { BaseProps } from "../../types";
import Menu from "./common/Menu";

const Toolbar = forwardRef(
	(
		{ className, ...props }: PropsWithChildren<BaseProps>,
		ref: Ref<HTMLDivElement>
	) => {
		return (
			<Menu
				{...props}
				ref={ref}
				className={`${className} relative py-1 px-5 border`}
			/>
		);
	}
);

export default Toolbar;
