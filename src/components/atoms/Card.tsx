import { PropsWithChildren } from "react";

interface Props {
	className?: string;
	color?: string;
	textColor?: string;
}

export default function Card({
	children,
	className,
	color = "bg-primary-container",
	textColor = "text-on-primary-container",
}: PropsWithChildren<Props>) {
	return (
		<div className={`p-5 rounded-xl ${color} ${textColor} ${className}`}>
			{children}
		</div>
	);
}
