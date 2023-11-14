"use client";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import TextLabel from "@components/text/TextLabel";
import TextBody from "@components/text/TextBody";

export interface Range {
	from: number;
	to: number;
}

interface Props {
	minValue?: number;
	maxValue?: number;
	defaultRange?: Range;
	label?: string;
}

export default function RangeSelector({
	minValue = 0,
	maxValue = 100,
	defaultRange,
	label,
}: Props) {
	const slider = useRef<HTMLDivElement>(null);
	const [sliderWidth, setSliderWidth] = useState<undefined | number>(
		undefined,
	);
	const [fromValue, _setFromValue] = useState(defaultRange?.from || minValue);
	const [toValue, _setToValue] = useState(defaultRange?.to || maxValue);

	useEffect(() => {
		setSliderWidth(slider?.current?.offsetWidth || undefined);
	}, [slider]);

	function calculateMovement(deltaX: number, previous: number): number {
		if (!sliderWidth) return 0;
		const range = maxValue - minValue;
		const deltaXPerc = deltaX / sliderWidth;
		return previous + deltaXPerc * range;
	}

	function setFromValue(newValue: number) {
		_setFromValue(Math.max(Math.min(newValue, toValue), minValue));
	}

	function setToValue(newValue: number) {
		_setToValue(Math.min(Math.max(newValue, fromValue), maxValue));
	}

	function moveFromCircle(deltaX: number) {
		setFromValue(calculateMovement(deltaX, fromValue));
	}

	function moveToCircle(deltaX: number) {
		setToValue(calculateMovement(deltaX, toValue));
	}

	return (
		<div className="flex flex-col gap-2">
			{label && <TextBody size={"small"}>{label}</TextBody>}
			<div
				className="relative h-2 mt-2 mb-7 w-full rounded-full bg-primary-surface"
				ref={slider}>
				<Circle
					value={fromValue}
					left={(fromValue / maxValue) * 100}
					mouseMoved={moveFromCircle}
					onValueManuallyChanged={setFromValue}
				/>
				<div
					className="absolute h-2 bg-primary"
					style={{
						left: `${(fromValue / maxValue) * 100}%`,
						right: `${(1 - toValue / maxValue) * 100}%`,
					}}
				/>
				<Circle
					value={toValue}
					left={(toValue / maxValue) * 100}
					mouseMoved={moveToCircle}
					onValueManuallyChanged={setToValue}
				/>
			</div>
		</div>
	);
}

interface CircleProps {
	left: number;
	mouseMoved: (deltaX: number) => void;
	value: number;
	onValueManuallyChanged: (newValue: number) => void;
}

function Circle({
	left,
	mouseMoved,
	value,
	onValueManuallyChanged,
}: CircleProps) {
	const [isMoving, setIsMoving] = useState(false);
	const [lastX, setLastX] = useState<undefined | number>(undefined);

	useEffect(() => {
		const onMouseMove: EventListener = (e: Event) => {
			if (!isMoving) return;
			if (lastX) {
				mouseMoved((e as MouseEvent).clientX - lastX);
			}
			setLastX((e as MouseEvent).clientX);
		};

		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("click", () => {
			if (isMoving) {
				setIsMoving(false);
			}
		});

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
		};
	}, [lastX, isMoving]);

	const stoppedMoving = () => {
		setLastX(undefined);
		setIsMoving(false);
	};

	const onTextChanged: FormEventHandler<HTMLDivElement> = (e) => {
		const text = e.currentTarget.innerText;
		onValueManuallyChanged(parseFloat(text));
		setLastX(undefined);
	};

	return (
		<div
			onMouseDown={() => setIsMoving(true)}
			onMouseUp={stoppedMoving}
			className="absolute top-1/2 flex flex-col w-6 z-10"
			style={{
				transform: "translateX(-50%) translateY(-50%)",
				left: `${left}%`,
			}}>
			<div className="h-6 rounded-full relative bg-primary cursor-pointer shadow-2xl">
				<div className="top-full w-full absolute flex flex-col justify-center items-center">
					<TextLabel
						size="medium"
						onBlur={onTextChanged}
						contentEditable={true}>
						{value <= 1 ? value.toFixed(2) : value.toFixed(0)}
					</TextLabel>
				</div>
			</div>
		</div>
	);
}
