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
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [transitionTiming, setTransitionTiming] = useState("linear");
	const childContainerRef = useRef<HTMLDivElement>(null);

	const calculateTransitionTiming = (): string => {
		const MAX_HEIGHT = 500;
		const clientHeight =
			childContainerRef.current?.clientHeight || MAX_HEIGHT;

		if (clientHeight < MAX_HEIGHT) {
			return "ease-in";
		}

		if (isCollapsed) {
			return `cubic-bezier(${Math.min(
				0.42,
				clientHeight / MAX_HEIGHT,
			)},0,1,1)`;
		}

		return `cubic-bezier(0,${Math.min(1, clientHeight / MAX_HEIGHT)},0,1)`;
	};
	const onClick = () => {
		setIsCollapsed(!isCollapsed);
		setTransitionTiming(calculateTransitionTiming());
		setIsTransitioning(true);
		setTimeout(() => {
			setIsTransitioning(false);
		}, TRANSITION_DURATION_MS);
	};

	console.log("transitiontiming", transitionTiming);

	return (
		<div
			className={`${
				!isCollapsed && !isTransitioning
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
						: `${childContainerRef?.current?.clientHeight}px`,
					transitionTimingFunction: transitionTiming,
				}}
				className="transition-all">
				<div ref={childContainerRef}>{children}</div>
			</div>
		</div>
	);
}
