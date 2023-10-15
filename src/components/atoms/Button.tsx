import { PropsWithChildren } from "react";
import TextLabel from "@components/text/TextLabel";

interface Props {
	onClick: () => void;
	className?: string;
}

export default function Button({
	children,
	onClick,
	className,
}: PropsWithChildren<Props>) {
	return (
		<div
			className={`transition-all bg-primary text-on-primary flex justify-center cursor-pointer items-center active:scale-95 h-fit w-fit p-3 rounded-xl ${className}`}
			onClick={onClick}>
			<TextLabel size={"large"}>{children}</TextLabel>
		</div>
	);
}
