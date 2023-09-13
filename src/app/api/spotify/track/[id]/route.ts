import { NextResponse } from "next/server";
import {
	AudioAnalysisObject,
	AudioFeaturesObject,
	TrackObject,
} from "@lib/spotify/generated";
import { withSpotifyAuth } from "@lib/wrapper/withSpotifyAuth";
import { z } from "zod";

export interface SpotifyGetTrackResponse extends TrackObject {
	audioFeatures?: AudioFeaturesObject;
	audioAnalysis?: AudioAnalysisObject;
	genres?: string[];
}

const requestParamsSchema = z.object({
	id: z.string(),
});

export const GET = withSpotifyAuth<typeof requestParamsSchema>(
	async (_req, params, spotifyClient) => {
		const trackId = params.id;

		const trackRes = await spotifyClient.tracks.getTrack(trackId);
		const audioFeaturesRes = await spotifyClient.tracks.getAudioFeatures(
			trackId,
		);
		const audioAnalysisRes = await spotifyClient.tracks.getAudioAnalysis(
			trackId,
		);

		if (trackRes.data.artists) {
			trackRes.data.artists = await Promise.all(
				trackRes.data.artists
					.map((artist) => artist.id)
					.filter((id): id is string => id !== undefined)
					.map(
						async (id) =>
							(await spotifyClient.artists.getAnArtist(id)).data,
					),
			);
		}

		const genres = trackRes.data.artists
			?.flatMap((artist) => artist.genres)
			.filter((genre): genre is string => genre !== undefined);

		return NextResponse.json<SpotifyGetTrackResponse>({
			...trackRes.data,
			audioFeatures: audioFeaturesRes.data,
			audioAnalysis: audioAnalysisRes.data,
			genres: [...new Set(genres)],
		});
	},
	requestParamsSchema,
);
