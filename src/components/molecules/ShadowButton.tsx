import { PropsWithChildren } from "react";
import ShadowBox from "@components/atoms/ShadowBox";

interface Props {
	onClick: () => void;
	className?: string;
}

export default function ShadowButton({
	onClick,
	children,
	className,
}: PropsWithChildren<Props>) {
	return (
		<div
			className={`hover:scale-105 transition-transform w-fit ${className}`}
			onClick={onClick}>
			<ShadowBox size={0.5} borderRadius="rounded-xl">
				<div className="bg-primary text-on-primary rounded-xl p-3 cursor-pointer">
					{children}
				</div>
			</ShadowBox>
		</div>
	);
}
