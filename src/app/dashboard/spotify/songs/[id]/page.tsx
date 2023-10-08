"use client";
import { useGetRequest } from "@lib/request/clientRequest";
import { SpotifyGetTrackResponse } from "@app/api/spotify/track/[id]/route";
import TextHeading from "@components/text/TextHeading";
import SongInfo from "@components/molecules/SongInfo";
import Index from "@components/molecules/SongAnalysis";
import PlayButton from "@components/molecules/PlayButton";
import React from "react";
import Link from "next/link";
import Card from "@components/atoms/Card";
import TextTitle from "@components/text/TextTitle";
import CoverImage from "@components/atoms/CoverImage";
import PageWrapper from "@components/templates/PageWrapper";

interface Params {
	id: string;
}

export default function Page({ params }: { params: Params }) {
	const { error, errorMessage, loading, data } =
		useGetRequest<SpotifyGetTrackResponse>(
			`/api/spotify/track/${params.id}`,
			{
				caching: true,
			},
		);

	return (
		<PageWrapper
			error={error}
			errorMessage={errorMessage}
			loading={!data || loading}>
			<TextHeading size="medium" className="mb-8">
				{data?.name}
			</TextHeading>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<CoverImage
					color="bg-primary-container dark:bg-on-surface"
					shadowColor="shadow-on-surface dark:shadow-primary-container"
					padding="p-4"
					shadowSize={1.5}
					image={data?.album?.images[0].url}
				/>
				<SongInfo
					album={data?.album?.name}
					releaseDate={data?.album?.release_date}
					keyAndMode={getKeyAndModeString(data)}
					bpm={data?.audioAnalysis?.track?.tempo}
					durationMS={data?.duration_ms}
					genres={data?.genres}
				/>
				<Index
					popularity={
						data?.popularity ? data.popularity / 100 : undefined
					}
					danceability={data?.audioFeatures?.danceability}
					energy={data?.audioFeatures?.energy}
					instrumentalness={data?.audioFeatures?.instrumentalness}
					acousticness={data?.audioFeatures?.acousticness}
					valence={data?.audioFeatures?.valence}
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
				<PlayButton
					audioSrc={data?.preview_url ? data.preview_url : undefined}
				/>
				{data?.artists
					?.slice(0, Math.min(data?.artists?.length, 2))
					.map((artist) => (
						<Link
							key={artist.id}
							href={`/dashboard/spotify/artists/${artist.id}`}>
							<Card className="h-full flex items-center justify-between gap-4">
								<TextTitle size="medium">
									{artist.name}
								</TextTitle>
								<CoverImage
									imageHeight="h-32"
									shadow={false}
									padding={"p-3"}
									image={
										artist.images
											? artist.images[0].url
											: undefined
									}
									className="min-w-max"
								/>
							</Card>
						</Link>
					))}
			</div>
		</PageWrapper>
	);
}

const keyMap: { [key: number]: string } = {
	0: "C",
	1: "C♯",
	2: "D",
	3: "D♯",
	4: "E",
	5: "F",
	6: "F♯",
	7: "G",
	8: "G♯",
	9: "A",
	10: "A♯",
	11: "B",
};

const modeMap: { [key: number]: string } = {
	0: "Minor",
	1: "Major",
};

function getKeyAndModeString(
	data?: SpotifyGetTrackResponse,
): string | undefined {
	const key = data?.audioFeatures?.key;
	const mode = data?.audioFeatures?.mode;

	if (key === undefined || mode === undefined) {
		return undefined;
	}

	return `${keyMap[key]} ${modeMap[mode]}`;
}
