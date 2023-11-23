"use client";
import Card from "@components/atoms/Card";
import TextBody from "@components/text/TextBody";
import TextHeading from "@components/text/TextHeading";
import { useState } from "react";
import ProgressBar from "@components/atoms/ProgressBar";
import PlayButton from "@components/atoms/PlayButton";

interface Props {
	audioSrc?: string;
}

export default function PlayButtonCard({ audioSrc }: Props) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState<number | undefined>(0);

	return (
		<Card className="flex items-center justify-start">
			<PlayButton
				onProgressChanged={setProgress}
				onIsPlayingChanged={setIsPlaying}
				audioSrc={audioSrc}
				height="h-20"
			/>
			{isPlaying ? (
				<ProgressBar className="ml-2" value={progress} max={1} />
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
