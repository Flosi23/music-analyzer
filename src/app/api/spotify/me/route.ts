import { NextResponse } from "next/server";
import { withSpotifyAuth } from "@lib/wrapper/withSpotifyAuth";
import { PrivateUserObject } from "@lib/spotify/generated";

export type SpotifyGetCurrentUsersProfileResponse = PrivateUserObject;
export const GET = withSpotifyAuth(async (_req, _params, spotifyClient) => {
	const res = await spotifyClient.users.getCurrentUsersProfile();
	return NextResponse.json<SpotifyGetCurrentUsersProfileResponse>(res.data);
});
