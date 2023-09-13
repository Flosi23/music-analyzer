"use client";
import Card from "@components/atoms/Card";
import { PauseIcon, PlayIcon } from "@heroicons/react/20/solid";
import TextBody from "@components/text/TextBody";
import TextHeading from "@components/text/TextHeading";
import { useEffect, useState } from "react";
import ProgressBar from "@components/atoms/ProgressBar";

interface Props {
	audioSrc?: string;
}

export default function PlayButton({ audioSrc }: Props) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState<number | undefined>(0);

	function togglePlaying() {
		setIsPlaying(!isPlaying);
	}

	function getAudioPlayer(): HTMLAudioElement | null {
		return document.getElementById("audio") as HTMLAudioElement | null;
	}

	useEffect(() => {
		getAudioPlayer()?.addEventListener("timeupdate", () => {
			setProgress(getAudioPlayer()?.currentTime);
		});
	}, []);

	useEffect(() => {
		const audioPlayer = getAudioPlayer();

		if (isPlaying) {
			audioPlayer?.play();
			return;
		}

		audioPlayer?.load();
		audioPlayer?.pause();
	}, [isPlaying]);

	useEffect(() => {}, []);

	return (
		<Card className="flex items-center justify-start">
			<audio
				id="audio"
				src={audioSrc}
				controls={false}
				autoPlay={false}
				onEnded={() => setIsPlaying(false)}
				onPause={() => setIsPlaying(false)}
			/>
			<div onClick={togglePlaying} className="cursor-pointer">
				{isPlaying ? (
					<PauseIcon className="h-20" />
				) : (
					<PlayIcon className="h-20" />
				)}
			</div>
			{isPlaying ? (
				<ProgressBar
					className="ml-2"
					value={progress}
					max={getAudioPlayer()?.duration}
				/>
			) : (
				<div className="ml-4">
					<TextHeading size="medium" className="mb-1">
						Play
					</TextHeading>
					<TextBody size="large">Preview</TextBody>
				</div>
			)}
		</Card>
	);
}
