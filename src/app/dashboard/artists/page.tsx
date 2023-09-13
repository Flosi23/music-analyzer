"use client";
import TextHeading from "@components/text/TextHeading";
import { useEffect, useState } from "react";
import SelectTimeRange, {
	defaultTimeRange,
	TimeRange,
} from "@components/molecules/SelectTimeRange";
import { useGetRequest } from "@lib/request/clientRequest";
import TopItems from "@components/templates/TopItems";
import { SpotifyGetCurrentUsersTopArtistsResponse } from "@app/api/spotify/me/top/artists/route";

export default function Page() {
	const [timeRange, setTimeRange] = useState<TimeRange>(defaultTimeRange);

	const { data, send } =
		useGetRequest<SpotifyGetCurrentUsersTopArtistsResponse>(
			`/api/spotify/me/top/artists?limit=50&timeRange=${timeRange}`,
			{
				dispatchImmediately: false,
				caching: true,
			},
		);

	useEffect(() => {
		send();
	}, [timeRange]);

	return (
		<>
			<div className="flex justify-between items-center w-full">
				<TextHeading size="medium">Your top artists</TextHeading>
				<SelectTimeRange onSelect={setTimeRange} />
			</div>
			<TopItems items={topArtistsToItems(data) ?? []} />
		</>
	);
}

function topArtistsToItems(
	topArtists: SpotifyGetCurrentUsersTopArtistsResponse | undefined,
) {
	return topArtists?.items.map((artist) => {
		return {
			link: `/dashboard/artists/${artist.id}`,
			text: artist.name,
			image: artist.images ? artist.images[0].url : "",
		};
	});
}
