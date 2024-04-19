import { forwardRef, PropsWithChildren, Ref } from "react";
import { BaseProps } from "../../types";

// common icon components
export const Icon = forwardRef(
	(
		{ className, ...props }: PropsWithChildren<BaseProps>,
		ref: Ref<HTMLSpanElement>
	) => (
		<span
			{...props}
			ref={ref}
			className={`material-symbols-outlined ${className} `}
		/>
	)
);
