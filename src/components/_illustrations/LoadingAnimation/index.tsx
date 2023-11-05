"use client";
import "./index.css";
import {
	ChartBarIcon,
	PlayIcon,
	ServerStackIcon,
} from "@heroicons/react/20/solid";
import { CSSProperties, useEffect, useState } from "react";

interface Song {
	name?: string;
	artist?: string;
}

interface Props {
	height?: string;
	songs: Song[];
}

interface CustomCSS extends CSSProperties {
	"--height": string;
	"--animation-duration": string;
}

export default function LoadingAnimation({ height = "40vh", songs }: Props) {
	const ANIMATION_DURATION_MS = 5000;
	const [songIndex, setSongIndex] = useState(0);

	useEffect(() => {
		const increaseSongCounter = () =>
			setSongIndex((s) => (s + 1) % (songs?.length || 1));
		const interval = setInterval(
			() => increaseSongCounter(),
			ANIMATION_DURATION_MS,
		);
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<>
			<div
				className="li-container flex flex-col items-center"
				style={
					{
						"--height": height,
						"--animation-duration": `${
							ANIMATION_DURATION_MS / 1000
						}s`,
					} as CustomCSS
				}>
				<div className="li-server flex items-center">
					<ServerStackIcon className="text-primary li-server-icon" />
					<h1>Spotify</h1>
				</div>
				<div className="relative li-connection flex flex-col justify-between items-center">
					<div className="li-connection-dot" />
					<div className="li-connection-dot" />
					<div className="li-connection-dot" />
					<div className="li-connection-animate bg-primary rounded-full"></div>
				</div>
				<div className="bg-primary flex items-center justify-between rounded-full li-song-card">
					<div className="li-song-card-left flex items-center">
						<PlayIcon className="li-song-card-icon li-song-card-left-icon text-on-primary" />
						<div className="li-song-card-left-text flex flex-col text-on-primary">
							<h1 className="whitespace-nowrap overflow-ellipsis overflow-hidden">
								{songs ? songs[songIndex].name : ""}
							</h1>
							<p className="whitespace-nowrap overflow-ellipsis overflow-hidden">
								{songs ? songs[songIndex].artist : ""}
							</p>
						</div>
					</div>
					<ChartBarIcon className="li-song-card-icon li-song-card-right text-on-primary" />
				</div>
			</div>
		</>
	);
}
