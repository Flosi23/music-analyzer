import { NextResponse } from "next/server";
import { ArtistObject, TrackObject } from "@lib/spotify/generated";
import { z } from "zod";
import { withSpotifyAuth } from "@lib/wrapper/withSpotifyAuth";

export interface SpotifyGetArtistResponse extends ArtistObject {
	topSongs: TrackObject[];
	relatedArtists: ArtistObject[];
}

const requestParamsSchema = z.object({
	id: z.string(),
});

export const GET = withSpotifyAuth<typeof requestParamsSchema>(
	async (_req, params, spotifyClient) => {
		const artistId = params.id;

		let artistRes = await spotifyClient.artists.getAnArtist(artistId);
		let topTracksRes = await spotifyClient.artists.getAnArtistsTopTracks(
			artistId,
			"US",
		);
		let relatedArtistsRes =
			await spotifyClient.artists.getAnArtistsRelatedArtists(artistId);

		return NextResponse.json<SpotifyGetArtistResponse>({
			...artistRes.data,
			topSongs: topTracksRes.data.tracks,
			relatedArtists: relatedArtistsRes.data.artists,
		});
	},
	requestParamsSchema,
);
