import "./index.css";
import { PropsWithChildren } from "react";

interface Props {
	tooltip?: string;
}

export default function Tooltip({
	tooltip,
	children,
}: PropsWithChildren<Props>) {
	return (
		<div className="relative">
			<div className="cursor-pointer tooltip w-fit">{children}</div>
			<div className="shadow-2xl text-on-primary transition-all absolute z-20 p-2 rounded-xl opacity-0 pointer-events-none bg-primary top-100 desc">
				{tooltip}
			</div>
		</div>
	);
}
