import { useState } from "react";
import { useSlate } from "slate-react";

import { Icon } from "../common/Icon";
import Tooltip from "../common/Tooltip";
import { Button } from "../common/Button";
import { CustomEditor } from "../../custom-editor/custom-editor";

const InsertBadgeButton = () => {
	// state to open dropdown for color variant
	const [dropdownOpen, setDropdownOpen] = useState(false);

	return (
		<Tooltip message="insert-badge">
			<Button
				className="relative"
				onMouseDown={(event: MouseEvent) => {
					event.preventDefault();
					setDropdownOpen(!dropdownOpen);
				}}
			>
				<Icon>style</Icon>

				{dropdownOpen && <DropdownMenu />}
			</Button>
		</Tooltip>
	);
};

// variant dropdown menu
const DropdownMenu = () => {
	const editor = useSlate();
	const variants: ["success", "error", "info"] = ["success", "error", "info"];
	const colorMap = {
		success: "bg-green-500",
		error: "bg-red-500",
		info: "bg-yellow-500",
	};

	return (
		<div className="flex flex-row items-center gap-3 absolute top-9 bg-white border p-5 z-50 rounded-md transition">
			{variants.map((value) => (
				<span
					key={value}
					className={`h-5 w-5  ${colorMap[value]} rounded hover:scale-110 transition`}
					onMouseDown={(event: React.MouseEvent<HTMLSpanElement>) => {
						event.preventDefault();
						if (CustomEditor.badge.isBadgeActive(editor)) {
							CustomEditor.badge.unwrapBadge(editor);
						} else {
							CustomEditor.badge.insertBadge(editor, value);
						}
					}}
				></span>
			))}
		</div>
	);
};
export default InsertBadgeButton;
