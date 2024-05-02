import { Editor } from "slate";
import { Edit, Plus } from "lucide-react";

import {
	addNewEditor,
	setCurrentEditor,
	setNewTitle,
} from "../store/editorSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const NavigationSidebar = ({ slateEditor }: { slateEditor: Editor }) => {
	// getting states from store
	const editors = useAppSelector((state) => state.editors.editors);
	const currentEditor = useAppSelector((state) => state.editors.currentEditor);

	const dispatch = useAppDispatch();

	return (
		<div className="flex flex-col gap-y-4 items-center w-60">
			<div className="text-center py-4 px-2 border-b-2 w-full">
				<h3 className="font-semibold text-xl text-indigo-500">Editors list</h3>
			</div>
			<div className="w-full">
				<ol>
					{editors.map((editor) => (
						<li key={editor.id}>
							<button
								className={`group px-2 py-2  hover:bg-zinc-200 text-center transition text-zinc-600 border-b w-full flex items-center justify-between ${
									currentEditor!.id === editor.id ? "bg-zinc-300" : ""
								} `}
								// dispatching action to set current editor
								onClick={() => {
									dispatch(
										setCurrentEditor({ id: editor.id, editor: slateEditor })
									);
								}}
							>
								<p className="text-ellipsis">{editor.title}</p>

								{/* to edit title of editor */}
								<Edit
									className="w-4 h-4 hover:text-zinc-900 scale-0 group-hover:scale-100 transition-all"
									onClick={(e) => {
										// stop from opening the editor
										e.stopPropagation();

										// prompt user for a new title
										const newTitle = prompt("Enter new title");

										if (newTitle) {
											// dispatching action to set new title
											dispatch(setNewTitle({ id: editor.id, newTitle }));
										}
									}}
								/>
							</button>
						</li>
					))}
				</ol>
				<button
					className="border-b px-2 py-2 flex items-center justify-between w-full hover:bg-zinc-200 text-zinc-600 transition"
					// dispatching action to add new blank editor
					onClick={() => dispatch(addNewEditor({ editor: slateEditor }))}
				>
					Add editor
					<Plus className="w-4 h-4" />
				</button>
			</div>
		</div>
	);
};

export default NavigationSidebar;
