import { PropsWithChildren } from "react";
import ShadowBox from "@components/atoms/ShadowBox";
import Card from "@components/atoms/Card";

interface Props {
	shadowSize?: number;
	shadowColor?: string;
	color?: string;
	textColor?: string;
	className?: string;
}

export default function ShadowCard({
	children,
	shadowSize,
	shadowColor,
	color,
	textColor,
	className,
}: PropsWithChildren<Props>) {
	return (
		<ShadowBox size={shadowSize} color={shadowColor}>
			<Card color={color} textColor={textColor} className={className}>
				{children}
			</Card>
		</ShadowBox>
	);
}
