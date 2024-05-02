import { Descendant, Editor, Transforms } from "slate";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { EditorInstance } from "../../types";

// interface for initial state
interface EditorsState {
	editors: EditorInstance[];
	currentEditor: EditorInstance | null;
}

const initialState: EditorsState = {
	editors: [],
	currentEditor: null,
};

// initial value of new editor
const initialValue: Descendant[] = [
	{
		type: "paragraph",
		children: [
			{ text: "This is editable " },
			{ text: "rich", bold: true },
			{ text: " text, " },
			{ text: "much", italic: true },
			{ text: " better than a " },
			{ text: "<textarea>", code: true },
			{ text: "!" },
		],
	},
	{
		type: "paragraph",
		children: [
			{
				text: "Since it's rich text, you can do things like turn a selection of text ",
			},
			{ text: "bold", bold: true },
			{
				text: ", or add a semantically rendered block quote in the middle of the page, like this:",
			},
		],
	},
	{
		type: "block-quote",
		children: [{ text: "A wise quote." }],
	},
	{
		type: "paragraph",
		children: [{ text: "Try it out for yourself!" }],
	},
];

export const editorsSlice = createSlice({
	name: "editors",
	initialState,
	reducers: {
		// action to add new blank editor
		addNewEditor: (state, action: PayloadAction<{ editor: Editor }>) => {
			// defining new editor object
			const newEditor: EditorInstance = {
				id: `editor${state.editors.length + 1}`,
				title: `Editor ${state.editors.length + 1}`,
				value: initialValue,
			};

			// pushing new editor in editors array
			state.editors.push(newEditor);

			// setting editors in localStorage
			localStorage.setItem("editorsRedux", JSON.stringify(state.editors));

			// moving cursor to first position of editor
			Transforms.select(action.payload.editor, { path: [0, 0], offset: 0 });

			// making new editor the current editor
			state.currentEditor = newEditor;
		},

		// action to set current editor using id
		setCurrentEditor: (
			state,
			action: PayloadAction<{ id: string; editor: Editor }>
		) => {
			// finding selected editor
			const selectedEditor = state.editors.find(
				(editor) => editor.id === action.payload.id
			);

			// if selected editor found
			if (selectedEditor) {
				// move cursion to first position of editor
				Transforms.select(action.payload.editor, { path: [0, 0], offset: 0 });

				// making selected editor the current editor
				state.currentEditor = selectedEditor;
			}
		},

		// action to load editors from localStorage or set into localStorage
		loadEditorsFromLocalStorage: (state) => {
			// get editors from localStorage
			const storedEditors = localStorage.getItem("editorsRedux");

			// if found, set state of editors and currentEditor
			if (storedEditors) {
				state.editors = JSON.parse(storedEditors);
				state.currentEditor = state.editors[0];
			} else {
				// if not found, initialize an instace
				const initialEditor: EditorInstance = {
					id: "editor1",
					title: "Untitled",
					value: initialValue,
				};

				// set editors as an array with new instance
				state.editors = [initialEditor];

				// set currenEditor as new instance
				state.currentEditor = initialEditor;

				// store editors array in localStorage
				localStorage.setItem("editorsRedux", JSON.stringify(state.editors));
			}
		},

		// action to store content of editor in localStorage when changes are made
		storeContent: (
			state,
			action: PayloadAction<{
				id: string;
				value: Descendant[];
				editor: Editor;
			}>
		) => {
			const value = action.payload.value;

			// boolean to check if changes made are other than selection
			const isAstChange = action.payload.editor.operations.some(
				(op) => "set_selection" !== op.type
			);

			// if changes made
			if (isAstChange) {
				if (state.currentEditor) {
					// map through editors
					const updatedEditors = state.editors.map((editor) => {
						// if editor is found, assign new title and content to the specific editor using id
						if (editor.id === action.payload.id) {
							return { ...editor, value };
						}
						return editor;
					});

					// set state as updated editors
					state.editors = updatedEditors;

					// store updated editors in localStorage
					localStorage.setItem("editorsRedux", JSON.stringify(state.editors));
				}
			}
		},

		// action to set new title for editor
		setNewTitle: (
			state,
			action: PayloadAction<{ id: String; newTitle: string }>
		) => {
			// find the editor using id and set it's new title
			const updatedEditors = state.editors.map((editor) => {
				if (editor.id === action.payload.id) {
					return { ...editor, title: action.payload.newTitle };
				}
				return editor;
			});

			// update editors in store
			state.editors = updatedEditors;

			// set editors in localStorage
			localStorage.setItem("editorsRedux", JSON.stringify(state.editors));

			// if updated title is of currentEditor, change it's title
			if (state.currentEditor?.id === action.payload.id) {
				state.currentEditor.title = action.payload.newTitle;
			}
		},
	},
});

export const {
	addNewEditor,
	setCurrentEditor,
	loadEditorsFromLocalStorage,
	storeContent,
	setNewTitle,
} = editorsSlice.actions;

export default editorsSlice.reducer;
