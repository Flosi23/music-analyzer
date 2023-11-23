import { PropsWithChildren, useRef, useState } from "react";
import TextBody from "@components/text/TextBody";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export interface CollapsableProps {
	text?: string;
	defaultState?: "collapsed" | "expanded";
	className?: string;
}

const TRANSITION_DURATION_MS = 300;
export default function Collapsable({
	text,
	defaultState = "collapsed",
	className,
	children,
}: PropsWithChildren<CollapsableProps>) {
	const [isCollapsed, setIsCollapsed] = useState(
		defaultState === "collapsed",
	);
	const [animationFinished, setAnimationFinished] = useState(true);
	const childContainerRef = useRef<HTMLDivElement>(null);

	const onClick = () => {
		setIsCollapsed(!isCollapsed);
		setAnimationFinished(false);
		setTimeout(() => {
			setAnimationFinished(true);
		}, TRANSITION_DURATION_MS);
	};

	return (
		<div
			className={`${
				!isCollapsed && animationFinished
					? "overflow-visible"
					: "overflow-hidden"
			}`}>
			<div
				className={`${className} flex justify-between items-center cursor-pointer w-full"`}
				onClick={onClick}>
				<TextBody size="medium">{text}</TextBody>
				<ChevronDownIcon
					className={`w-10 mt-1 transition-all ${
						isCollapsed ? "-rotate-90" : "rotate-0"
					}`}
				/>
			</div>
			<div
				style={{
					transitionDuration: `${TRANSITION_DURATION_MS}ms`,
					maxHeight: isCollapsed
						? "0"
						: `${
								childContainerRef?.current?.clientHeight || 2000
						  }px`,
				}}
				className="transition-all"
				ref={childContainerRef}>
				{children}
			</div>
		</div>
	);
}
