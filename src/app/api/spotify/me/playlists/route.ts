import { withSpotifyAuth } from "@lib/wrapper/withSpotifyAuth";
import { SimplifiedPlaylistObject } from "@lib/spotify/generated";
import { NextResponse } from "next/server";

export type SpotifyGetCurrentUsersPlaylistsResponse =
	SimplifiedPlaylistObject[];
export const GET = withSpotifyAuth(async (_req, params, spotifyClient) => {
	const res = await spotifyClient.playlists.getUsersPlaylistsAll();

	return NextResponse.json<SpotifyGetCurrentUsersPlaylistsResponse>(res);
});
