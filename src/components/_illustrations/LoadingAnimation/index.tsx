import "./index.css";
import {
	ChartBarIcon,
	PlayIcon,
	ServerStackIcon,
} from "@heroicons/react/20/solid";
import { CSSProperties } from "react";

interface Props {
	height?: string;
}

interface CustomCSS extends CSSProperties {
	"--height": string;
}

export default function LoadingAnimation({ height = "40vh" }: Props) {
	return (
		<>
			<div
				className="li-container flex flex-col items-center"
				style={{ "--height": height } as CustomCSS}>
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
						<PlayIcon className="li-song-card-icon text-on-primary" />
						<div className="flex flex-col text-on-primary">
							<h1>Maneater</h1>
							<p>Nelly Furtado</p>
						</div>
					</div>
					<ChartBarIcon className="li-song-card-icon li-song-card-right text-on-primary" />
				</div>
			</div>
		</>
	);
}
