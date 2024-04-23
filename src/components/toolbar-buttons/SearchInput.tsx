import { Icon } from "../common/Icon";

interface SearchInputProps {
	setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
}

// component of search input
const SearchInput: React.FC<SearchInputProps> = ({ setSearch }) => {
	return (
		<div className="relative flex border p-1 rounded-md focus-within:ring-2 focus-within:ring-indigo-500">
			{/* search icon */}
			<Icon className="text-indigo-500">search</Icon>

			{/* search input */}
			<input
				type="search"
				placeholder="Search the text..."
				onChange={(e) => setSearch(e.target.value)}
				className="pl-5 w-full outline-none"
			/>
		</div>
	);
};

export default SearchInput;
