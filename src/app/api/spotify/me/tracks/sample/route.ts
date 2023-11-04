import { withSpotifyAuth } from "@lib/wrapper/withSpotifyAuth";
import { z } from "zod";
import { TrackObject } from "@lib/spotify/generated";
import { NextResponse } from "next/server";

const requestParamsSchema = z.object({
	includeLikedSongs: z.coerce.boolean(),
	playlistId: z.string().optional(),
	maxCount: z.number().min(1).max(50).optional().default(10),
});

export type SpotifyGetCurrentUsersTracksSampleResponse = TrackObject[];
export const GET = withSpotifyAuth(async (_req, params, spotifyClient) => {
	let tracks: TrackObject[] = [];

	console.log("params", params);

	if (params.includeLikedSongs) {
		const savedTracks = await spotifyClient.tracks.getUsersSavedTracksAll(
			params.maxCount,
		);

		tracks = savedTracks
			.map((s) => s.track)
			.filter((t): t is TrackObject => t !== undefined);
	}

	if (params.playlistId && tracks.length < params.maxCount) {
		const pagingPlaylistTracksRes =
			await spotifyClient.playlists.getPlaylistsTracks(
				params.playlistId,
				undefined,
				undefined,
				params.maxCount,
			);

		tracks = pagingPlaylistTracksRes.data.items;
	}

	return NextResponse.json<SpotifyGetCurrentUsersTracksSampleResponse>(
		tracks,
	);
}, requestParamsSchema);
