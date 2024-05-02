import { configureStore } from "@reduxjs/toolkit";
import editorsReducer, { loadEditorsFromLocalStorage } from "./editorSlice";

export const store = configureStore({
	reducer: {
		editors: editorsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

store.dispatch(loadEditorsFromLocalStorage());

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
