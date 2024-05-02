import { setNewTitle } from "../store/editorSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Edit } from "lucide-react";

// component to show editor title
const Title = () => {
	const dispatch = useAppDispatch();

	// gettting current editor from store
	const currentEditor = useAppSelector((state) => state.editors.currentEditor);
	return (
		<div className="group text-center mt-4 flex justify-center gap-x-2 items-center text-zinc-800">
			<h1 className="text-xl  font-semibold">{currentEditor?.title}</h1>
			<Edit
				className="w-5 h-5 scale-0 group-hover:scale-100 transition-all cursor-pointer"
				onClick={() => {
					const newTitle = prompt("Enter new title");
					if (newTitle && currentEditor) {
						dispatch(setNewTitle({ id: currentEditor?.id, newTitle }));
					}
				}}
			/>
		</div>
	);
};

export default Title;
