import { Descendant, Path } from "slate";

export interface BaseProps {
	className: string;
	[key: string]: unknown;
}

export interface EditorInstance {
	id: string;
	title: string;
	value: Descendant[];
}

export type Range = {
	anchor: {
		path: Path;
		offset: number;
	};
	focus: { path: Path; offset: number };
	highlight: boolean;
};

export type Ranges = Range[];
