import { withSpotifyAuth } from "@lib/wrapper/withSpotifyAuth";
import { NextResponse } from "next/server";
import {
	ArtistObject,
	AudioFeaturesObject,
	PlaylistTrackObject,
	SavedTrackObject,
	TrackObject,
} from "@lib/spotify/generated";
import SpotifyClient from "@lib/spotify";
import {
	constructDetailedTrackObjects,
	mapPlaylistsTracksToTracks,
	mapSavedTracksToTracks,
} from "@app/api/spotify/me/tracks/mapping";
import { z } from "zod";

const requestParamsSchema = z.object({
	source: z.enum(["liked_songs", "playlists", "both"]).default("both"),
	playlistIds: z.string().optional(),
});

export const GET = withSpotifyAuth(async (_req, _params, spotifyClient) => {
	let savedTracks: SavedTrackObject[] = [];
	let playlistTracks: PlaylistTrackObject[] = [];

	if (_params.source !== "playlists") {
		savedTracks = await spotifyClient.tracks.getUsersSavedTracksAll();
	}

	if (_params.source !== "liked_songs" && !_params.playlistIds) {
		playlistTracks =
			await spotifyClient.playlists.getUsersPlaylistsTracksAll();
	}

	if (_params.source !== "liked_songs" && _params.playlistIds) {
		playlistTracks = await spotifyClient.playlists.getUsersPlaylistsTracks(
			_params.playlistIds.split(","),
		);
	}

	let tracks: TrackObject[] = [
		...mapSavedTracksToTracks(savedTracks),
		...mapPlaylistsTracksToTracks(playlistTracks),
	];

	// remove duplicates
	tracks = tracks.filter(
		(trackA, index, self) =>
			index === self.findIndex((trackB) => trackA.id === trackB.id),
	);

	const artists = await fetchArtists(tracks, spotifyClient);
	const audioFeatures = await fetchAudioFeatures(tracks, spotifyClient);
	const detailedTracks = constructDetailedTrackObjects(
		tracks,
		artists,
		audioFeatures,
	);

	return NextResponse.json({ tracks: detailedTracks });
}, requestParamsSchema);

async function fetchArtists(
	tracks: TrackObject[],
	spotifyClient: SpotifyClient,
): Promise<ArtistObject[]> {
	const artistIds = tracks
		.flatMap((track) => track.artists?.map((artist) => artist.id))
		.filter((id): id is string => id !== undefined);
	// remove duplicates
	const filteredArtistIds = [...new Set(artistIds)];

	const artists: ArtistObject[] = [];

	for (let i = 0; i < filteredArtistIds.length; i += 50) {
		const chunk = filteredArtistIds.slice(
			i,
			Math.min(filteredArtistIds.length, i + 50),
		);

		const artistsRes = await spotifyClient.artists.getMultipleArtists(
			chunk.join(","),
		);

		artists.push(...artistsRes.data.artists);
	}

	return artists;
}

async function fetchAudioFeatures(
	tracks: TrackObject[],
	spotifyClient: SpotifyClient,
): Promise<AudioFeaturesObject[]> {
	const audioFeatures: AudioFeaturesObject[] = [];

	for (let i = 0; i < tracks.length; i += 100) {
		const chunk = tracks.slice(i, Math.min(tracks.length, i + 100));
		const ids = chunk.map((track) => track.id!).join(",");

		const audioFeaturesRes =
			await spotifyClient.tracks.getSeveralAudioFeatures(ids);

		audioFeatures.push(...audioFeaturesRes.data.audio_features);
	}

	return audioFeatures;
}