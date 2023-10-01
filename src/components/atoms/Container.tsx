import { PropsWithChildren } from "react";

interface Props {
	className?: string;
}

export default function Container({
	children,
	className,
}: PropsWithChildren<Props>) {
	return (
		<div
			className={`mx-4 md:mx-20 lg:mx-20 xl:mx-32 2xl:mx-72 ${className}`}>
			{children}
		</div>
	);
}
