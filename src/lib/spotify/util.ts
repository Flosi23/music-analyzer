import { TrackObject } from "@lib/spotify/generated";

export function getDisplayString(track: TrackObject) {
	return `${track.name} - ${track.artists
		?.reduce((previous, current) => `${previous}, ${current.name}`, "")
		.slice(1)}`;
}
