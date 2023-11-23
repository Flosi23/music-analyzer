"use client";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import TextLabel from "@components/text/TextLabel";
import TextBody from "@components/text/TextBody";
import Tooltip from "@components/atoms/Tooltip";

export interface Range {
	from: number;
	to: number;
}

interface Props {
	minValue?: number;
	maxValue?: number;
	defaultRange?: Range;
	label?: string;
	tooltip?: string;
	onChange?: (r: Range) => void;
}

export default function RangeSelector({
	minValue = 0,
	maxValue = 100,
	defaultRange,
	onChange,
	label,
	tooltip,
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
		const newFromValue = Math.max(Math.min(newValue, toValue), minValue);
		_setFromValue(newFromValue);
		if (onChange) {
			onChange({ to: toValue, from: newFromValue });
		}
	}

	function setToValue(newValue: number) {
		const newToValue = Math.min(Math.max(newValue, fromValue), maxValue);
		_setToValue(newToValue);
		if (onChange) {
			onChange({ to: newToValue, from: fromValue });
		}
	}

	function moveFromCircle(deltaX: number) {
		setFromValue(calculateMovement(deltaX, fromValue));
	}

	function moveToCircle(deltaX: number) {
		setToValue(calculateMovement(deltaX, toValue));
	}

	const labelElement = (
		<TextBody size="small" className="w-fit">
			{label}
		</TextBody>
	);

	return (
		<div className="flex flex-col gap-1">
			{tooltip && label && (
				<Tooltip tooltip={tooltip}>{labelElement}</Tooltip>
			)}
			{!tooltip && label && labelElement}
			<div
				className="relative mx-4 h-1.5 mt-2 mb-6 rounded-full bg-primary-surface"
				ref={slider}>
				<Circle
					value={fromValue}
					left={
						((fromValue - minValue) / (maxValue - minValue)) * 100
					}
					mouseMoved={moveFromCircle}
					onValueManuallyChanged={setFromValue}
				/>
				<div
					className="absolute h-1.5 bg-primary"
					style={{
						left: `${
							((fromValue - minValue) / (maxValue - minValue)) *
							100
						}%`,
						right: `${
							(1 - (toValue - minValue) / (maxValue - minValue)) *
							100
						}%`,
					}}
				/>
				<Circle
					value={toValue}
					left={((toValue - minValue) / (maxValue - minValue)) * 100}
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
				stoppedMoving();
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
		stoppedMoving();
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
						size="small"
						onBlur={onTextChanged}
						contentEditable={true}>
						{value <= 1 ? value.toFixed(2) : value.toFixed(0)}
					</TextLabel>
				</div>
			</div>
		</div>
	);
}
