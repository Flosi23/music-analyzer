import { PropsWithChildren } from "react";

interface Props {
	className?: string;
}

export default function Container({
	children,
	className,
}: PropsWithChildren<Props>) {
	return <div className={`mx-40 ${className}`}>{children}</div>;
}
