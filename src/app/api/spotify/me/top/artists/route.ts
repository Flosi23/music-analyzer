import { withSpotifyAuth } from "@lib/wrapper/withSpotifyAuth";
import { z } from "zod";
import { PagingArtistObject } from "@lib/spotify/generated";
import { NextResponse } from "next/server";

export type SpotifyGetCurrentUsersTopArtistsResponse = PagingArtistObject;

const requestParamsSchema = z.object({
	timeRange: z.enum(["short_term", "medium_term", "long_term"]),
	limit: z.number().positive(),
});

export const GET = withSpotifyAuth(async (_req, params, spotifyClient) => {
	const res = await spotifyClient.users.getUsersTopArtists(
		params.timeRange,
		params.limit,
	);

	return NextResponse.json<SpotifyGetCurrentUsersTopArtistsResponse>(
		res.data,
	);
}, requestParamsSchema);
