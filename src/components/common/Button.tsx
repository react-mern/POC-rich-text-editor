import { Ref, PropsWithChildren, forwardRef } from "react";

import { BaseProps } from "../../../types";

// common button component
export const Button = forwardRef(
	(
		{
			className,
			active,
			reversed,
			...props
		}: PropsWithChildren<
			{
				active: boolean;
				reversed: boolean;
			} & BaseProps
		>,
		ref: Ref<HTMLSpanElement>
	) => (
		<span
			{...props}
			ref={ref}
			className={`${className} cursor-pointer rounded-md transition hover:bg-indigo-500 hover:text-white h-7 w-7 grid place-items-center ${
				reversed
					? active
						? "text-white"
						: "text-[#aaa]"
					: active
					? "text-white bg-indigo-500"
					: "text-indigo-500"
			}`}
		/>
	)
);
