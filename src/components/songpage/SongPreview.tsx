import { PauseIcon, PlayIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

interface SongPreviewProps {
	src: string;
}

const SongPreview = ({ src }: SongPreviewProps) => {
	//preview with only a play button and a little text beside it
	//custom audio player

	const [playing, setPlaying] = useState(false);
	const [progress, setProgress] = useState<number | undefined>(0);
	// iff playing is true play audio
	// else pause audio

	if (playing) {
		document.querySelector("audio")?.play();
	} else {
		document.querySelector("audio")?.load();
		document.querySelector("audio")?.pause();
	}
	//if finished playing set playing to false
	if (document.querySelector("audio")?.ended) {
		setPlaying(false);
	}
	//set progress
	useEffect(() => {
		document.querySelector("audio")?.addEventListener("timeupdate", () => {
			setProgress(document.querySelector("audio")?.currentTime);
		});
	}, []);

	return (
		<div className="flex justify-left items-center align-middle w-full p-4">
			<audio
				src={src}
				controls={false}
				autoPlay={false}
				onEnded={() => setPlaying(false)}
				onPause={() => setPlaying(false)}
			/>
			<button
				className="mr-5"
				onClick={() => {
					setPlaying(!playing);
				}}>
				{/* //display play or pause button from heroicons */}
				{!playing ? (
					<PlayIcon className="w-16  hover:scale-110 transition ease-in-out" />
				) : (
					<PauseIcon className="w-16  hover:scale-110 transition ease-in-out" />
				)}
			</button>
			{/* display Text:PlayPreview or wave form if is Playing */}
			{!playing ? (
				<div className="flex flex-row lg:flex-col items-center">
					<p className="text-white text-5xl lg:text-6xl font-bold mr-3">
						Play
					</p>
					<p className="text-white text-3xl lg:text-4xl  ">Preview</p>
				</div>
			) : (
				<div
					className="w-full mr-4 flex items-center"
					data-theme="songpreview">
					<progress
						className="progress w-full h-5 progress-accent"
						value={document.querySelector("audio")?.currentTime}
						max={
							document.querySelector("audio")?.duration
						}></progress>
				</div>
			)}
		</div>
	);
};

export default SongPreview;
