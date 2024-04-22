import { createPortal } from "react-dom";

const Portal = ({ children }: { children?: React.ReactNode }) => {
	return typeof document === "object"
		? createPortal(children, document.body)
		: null;
};

export default Portal;
