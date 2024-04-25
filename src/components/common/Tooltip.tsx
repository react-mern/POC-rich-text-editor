interface TooltipProps {
	children: React.ReactNode;
	message: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, message }) => {
	const splitFormat = message.split("-").join(" ");
	const tooltipMessage =
		splitFormat.charAt(0).toUpperCase() + splitFormat.slice(1);
	return (
		<div className="group relative flex">
			{children}
			<span className="absolute border top-8 scale-0 transition-all rounded-md bg-white p-2 text-xs text-indigo-500 group-hover:scale-100 z-50">
				{tooltipMessage}
			</span>
		</div>
	);
};

export default Tooltip;
