import { withSpotifyAuth } from "@lib/wrapper/withSpotifyAuth";
import { NextResponse } from "next/server";
import { CurrentlyPlayingObject } from "@lib/spotify/generated";

export type SpotifyGetCurrentlyPlayingResponse = CurrentlyPlayingObject;
export const GET = withSpotifyAuth(async (_req, _params, spotifyClient) => {
	const res = await spotifyClient.player.getTheUsersCurrentlyPlayingTrack();
	return NextResponse.json<SpotifyGetCurrentlyPlayingResponse>(res.data);
});
