import { PauseIcon, PlayIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";

interface Props {
	audioSrc?: string;
	height?: string;
	onProgressChanged?: (progress: number | undefined) => void;
	onIsPlayingChanged?: (isPlaying: boolean) => void;
}

export default function PlayButton({
	audioSrc,
	height,
	onProgressChanged,
	onIsPlayingChanged,
}: Props) {
	const [isPlaying, _setIsPlaying] = useState(false);
	const audioPlayerRef = useRef<HTMLAudioElement>(null);

	function setIsPlaying(value: boolean) {
		_setIsPlaying(value);
		if (onIsPlayingChanged) {
			onIsPlayingChanged(value);
		}
	}

	function togglePlaying() {
		setIsPlaying(!isPlaying);
	}

	useEffect(() => {
		audioPlayerRef.current?.addEventListener("timeupdate", () => {
			const currentTime = audioPlayerRef.current?.currentTime;
			const duration = audioPlayerRef.current?.duration;
			if (onProgressChanged) {
				onProgressChanged(
					duration && currentTime
						? currentTime / duration
						: undefined,
				);
			}
		});
	}, []);

	useEffect(() => {
		const audioPlayer = audioPlayerRef.current;

		if (isPlaying) {
			audioPlayer?.play();
			return;
		}

		audioPlayer?.load();
		audioPlayer?.pause();
	}, [isPlaying]);

	useEffect(() => {}, []);

	return (
		<div>
			<audio
				ref={audioPlayerRef}
				src={audioSrc}
				controls={false}
				autoPlay={false}
				onEnded={() => setIsPlaying(false)}
				onPause={() => setIsPlaying(false)}
			/>
			<div onClick={togglePlaying} className="cursor-pointer">
				{isPlaying ? (
					<PauseIcon className={height} />
				) : (
					<PlayIcon className={height} />
				)}
			</div>
		</div>
	);
}
