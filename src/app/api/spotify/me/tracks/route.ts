import { withSpotifyAuth } from "@lib/wrapper/withSpotifyAuth";
import { NextResponse } from "next/server";
import {
	ArtistObject,
	AudioFeaturesObject,
	GetMultipleArtists200Response,
	GetSeveralAudioFeatures200Response,
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
import { DetailedTrackObject } from "@app/api/spotify/me/tracks/types";
import { AxiosResponse } from "axios";

const requestParamsSchema = z.object({
	includeLikedSongs: z.coerce.boolean(),
	playlistIds: z.string().optional(),
});

export type SpotifyGetCurrentUsersTracksResponse = DetailedTrackObject[];

export const GET = withSpotifyAuth(async (_req, params, spotifyClient) => {
	let savedTracks: SavedTrackObject[] = [];
	let playlistTracks: PlaylistTrackObject[] = [];

	if (params.includeLikedSongs) {
		savedTracks = await spotifyClient.tracks.getUsersSavedTracksAll();
	}

	if (params.playlistIds) {
		playlistTracks = await spotifyClient.playlists.getUsersPlaylistsTracks(
			params.playlistIds.split(","),
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

	return NextResponse.json<SpotifyGetCurrentUsersTracksResponse>(
		detailedTracks,
	);
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

	const artistsPromises: Promise<
		AxiosResponse<GetMultipleArtists200Response>
	>[] = [];

	for (let i = 0; i < filteredArtistIds.length; i += 50) {
		const chunk = filteredArtistIds.slice(
			i,
			Math.min(filteredArtistIds.length, i + 50),
		);

		const promise = spotifyClient.artists.getMultipleArtists(
			chunk.join(","),
		);

		artistsPromises.push(promise);
	}

	const artists = await Promise.all(artistsPromises);
	return artists.flatMap((a) => a.data.artists);
}

async function fetchAudioFeatures(
	tracks: TrackObject[],
	spotifyClient: SpotifyClient,
): Promise<AudioFeaturesObject[]> {
	const audioFeaturesPromises: Promise<
		AxiosResponse<GetSeveralAudioFeatures200Response>
	>[] = [];

	for (let i = 0; i < tracks.length; i += 100) {
		const chunk = tracks.slice(i, Math.min(tracks.length, i + 100));
		const ids = chunk.map((track) => track.id!).join(",");

		const promise = spotifyClient.tracks.getSeveralAudioFeatures(ids);

		audioFeaturesPromises.push(promise);
	}

	const audioFeatures = await Promise.all(audioFeaturesPromises);
	return audioFeatures.flatMap((a) => a.data.audio_features);
}
