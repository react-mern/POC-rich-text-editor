import { NodeEntry, Text } from "slate";
import { useCallback, useState } from "react";

import { Ranges } from "../../types";

// hook to highlight searched text
export const useDecorate = () => {
	// state to store input text
	const [search, setSearch] = useState<string | undefined>("");

	// function to decorate searched text
	const decorate = useCallback(
		([node, path]: NodeEntry) => {
			const ranges: Ranges = [];
			// if user has searched text and the node corresponds to text
			if (search && Text.isText(node)) {
				// extracting text from node
				const { text } = node;

				// splitting text according to searched text
				const parts = text.split(search);
				let offset = 0;

				// iterating over parts	and pushing positions to ranges for highlighting using anchor and focus
				parts.forEach((part, i) => {
					if (i !== 0) {
						// adding positions tof searched text to highlight
						ranges.push({
							anchor: { path, offset: offset - search.length },
							focus: { path, offset },
							highlight: true,
						});
					}

					// we skip the first part and add the offset the length of part, length of searched text to offset
					offset = offset + part.length + search.length;
				});
			}
			return ranges;
		},
		[search]
	);

	return { search, setSearch, decorate };
};
