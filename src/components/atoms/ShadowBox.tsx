import { PropsWithChildren } from "react";

interface Props {
	size?: number;
	color?: string;
	className?: string;
	borderRadius?: string;
}

export default function ShadowBox({
	children,
	color = "shadow-on-surface",
	size = 1,
	className,
	borderRadius = "rounded-3xl",
}: PropsWithChildren<Props>) {
	return (
		<div
			className={`${color} ${borderRadius} ${className}`}
			style={{
				marginRight: `${size}rem`,
				marginBottom: `${size}rem`,
				boxShadow: `${size}rem ${size}rem 0rem 0rem var(--tw-shadow-color)`,
			}}>
			{children}
		</div>
	);
}
