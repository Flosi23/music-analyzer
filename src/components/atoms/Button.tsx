import { PropsWithChildren } from "react";
import TextLabel from "@components/text/TextLabel";

interface Props {
	onClick: () => void;
}

export default function Button({
	children,
	onClick,
}: PropsWithChildren<Props>) {
	return (
		<div
			className="transition-all bg-primary text-on-primary flex justify-center cursor-pointer items-center active:scale-95 h-fit w-fit p-3 rounded-xl"
			onClick={onClick}>
			<TextLabel size={"large"}>{children}</TextLabel>
		</div>
	);
}
