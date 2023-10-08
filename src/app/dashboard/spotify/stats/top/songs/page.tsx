"use client";
import TextHeading from "@components/text/TextHeading";
import { useEffect, useState } from "react";
import SelectTimeRange, {
	defaultTimeRange,
	TimeRange,
} from "@components/molecules/SelectTimeRange";
import { useGetRequest } from "@lib/request/clientRequest";
import { SpotifyGetCurrentUsersTopTracksResponse } from "@app/api/spotify/me/top/tracks/route";
import TopItems from "@components/templates/TopItems";
import { getDisplayString } from "@lib/spotify/util";
import PageWrapper from "@components/templates/PageWrapper";

export default function Page() {
	const [timeRange, setTimeRange] = useState<TimeRange>(defaultTimeRange);

	const { error, errorMessage, loading, data, send } =
		useGetRequest<SpotifyGetCurrentUsersTopTracksResponse>(
			`/api/spotify/me/top/tracks?limit=50&timeRange=${timeRange}`,
			{
				dispatchImmediately: false,
				caching: true,
			},
		);

	useEffect(() => {
		send();
	}, [timeRange]);

	return (
		<PageWrapper
			error={error}
			errorMessage={errorMessage}
			loading={!data || loading}>
			<div className="flex justify-between items-center w-full">
				<TextHeading size="medium">Your top songs</TextHeading>
				<SelectTimeRange onSelect={setTimeRange} />
			</div>
			<TopItems items={topTrackToItems(data) ?? []} />
		</PageWrapper>
	);
}

function topTrackToItems(
	topTracks: SpotifyGetCurrentUsersTopTracksResponse | undefined,
) {
	return topTracks?.items?.map((track) => {
		return {
			link: `/dashboard/spotify/songs/${track.id}`,
			text: getDisplayString(track),
			image: track.album?.images[0].url,
		};
	});
}
