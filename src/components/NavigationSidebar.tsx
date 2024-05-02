import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addNewEditor, setCurrentEditor } from "../store/editorSlice";
import { Editor } from "slate";

const NavigationSidebar = ({ slateEditor }: { slateEditor: Editor }) => {
	// getting states from store
	const editors = useAppSelector((state) => state.editors.editors);
	const currentEditor = useAppSelector((state) => state.editors.currentEditor);

	const dispatch = useAppDispatch();

	return (
		<div className="flex flex-col gap-y-4 items-center">
			<div className="text-center py-4 px-2 border-b-2 w-full">
				<h3 className="font-semibold text-xl text-indigo-500">Editors list</h3>
			</div>
			<div className="w-full">
				<ol>
					{editors.map((editor) => (
						<li key={editor.id}>
							<button
								className={`w-full py-2 border-b hover:bg-indigo-100 text-center ${
									currentEditor!.id === editor.id ? "bg-indigo-200" : ""
								}`}
								// dispatching action to set current editor
								onClick={() => {
									dispatch(
										setCurrentEditor({ id: editor.id, editor: slateEditor })
									);
								}}
							>
								{editor.title}
							</button>
						</li>
					))}
				</ol>
				<button
					className="border-b py-2 w-full hover:bg-indigo-100"
					// dispatching action to add new blank editor
					onClick={() => dispatch(addNewEditor({ editor: slateEditor }))}
				>
					New blank editor
				</button>
			</div>
		</div>
	);
};

export default NavigationSidebar;
