import { withSpotifyAuth } from "@lib/wrapper/withSpotifyAuth";
import { z } from "zod";
import { PagingTrackObject } from "@lib/spotify/generated";
import { NextResponse } from "next/server";

export type SpotifyGetCurrentUsersTopTracksResponse = PagingTrackObject;

const requestParamsSchema = z.object({
	timeRange: z.enum(["short_term", "medium_term", "long_term"]),
	limit: z.number().positive(),
});

export const GET = withSpotifyAuth(async (_req, params, spotifyClient) => {
	const res = await spotifyClient.users.getUsersTopTracks(
		params.timeRange,
		params.limit,
	);

	return NextResponse.json<SpotifyGetCurrentUsersTopTracksResponse>(res.data);
}, requestParamsSchema);
