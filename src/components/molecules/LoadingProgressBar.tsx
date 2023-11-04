"use client";
import ProgressBar from "@components/atoms/ProgressBar";
import { useEffect, useState } from "react";
import TextLabel from "@components/text/TextLabel";

interface Props {
	durationMS: number;
	finishEarly?: boolean;
	onFinished?: () => void;
	className?: string;
}

const UPDATE_INTERVAL_MS = 10;

export default function LoadingProgressBar({
	durationMS,
	finishEarly = false,
	onFinished = () => {},
	className,
}: Props) {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (progress >= durationMS) {
			onFinished();
			return;
		}

		const timeout = setTimeout(() => {
			let add = UPDATE_INTERVAL_MS;
			if (finishEarly) {
				add = (durationMS - progress) / 20;
			}

			setProgress(Math.ceil(progress + add));
		}, UPDATE_INTERVAL_MS);
		return () => clearTimeout(timeout);
	}, [progress]);

	return (
		<div className="flex flex-col w-full items-center gap-2">
			<ProgressBar
				value={progress}
				max={durationMS}
				min={0}
				backgroundColor="bg-primary-surface"
				color="bg-primary"
				className={className}
			/>
			<TextLabel size="medium">
				{Math.round((progress / durationMS) * 100)}%
			</TextLabel>
		</div>
	);
}
