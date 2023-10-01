"use client";
import { useSession } from "next-auth/react";
import TextDisplay from "@components/text/TextDisplay";
import { useGetRequest } from "@lib/request/clientRequest";
import { SpotifyGetCurrentUsersTopTracksResponse } from "@app/api/spotify/me/top/tracks/route";
import { SpotifyGetCurrentUsersTopArtistsResponse } from "@app/api/spotify/me/top/artists/route";
import { ArtistObject, TrackObject } from "@lib/spotify/generated";
import OverviewCard from "@components/organisms/OverviewCard";
import { getDisplayString } from "@lib/spotify/util";
import { useEffect, useState } from "react";
import SelectTimeRange, {
	defaultTimeRange,
	TimeRange,
} from "@components/molecules/SelectTimeRange";

export default function Page() {
	const session = useSession();

	const limit = 5;

	const [timeRange, setTimeRange] = useState<TimeRange>(defaultTimeRange);

	const {
		loading: topTracksLoading,
		data: topTracks,
		send: sendTracksReq,
	} = useGetRequest<SpotifyGetCurrentUsersTopTracksResponse>(
		`/api/spotify/me/top/tracks?timeRange=${timeRange}&limit=${limit}`,
		{
			dispatchImmediately: false,
			caching: true,
		},
	);

	const {
		loading: topArtistsLoading,
		data: topArtists,
		send: sendArtistsReq,
	} = useGetRequest<SpotifyGetCurrentUsersTopArtistsResponse>(
		`/api/spotify/me/top/artists?timeRange=${timeRange}&limit=${limit}`,
		{
			dispatchImmediately: false,
			caching: true,
		},
	);

	useEffect(() => {
		sendArtistsReq();
		sendTracksReq();
	}, [timeRange]);

	return (
		<>
			<div className="flex justify-between items-center mb-8">
				<TextDisplay size="small" className="w-min sm:w-fit">
					Hey, @{session.data?.user?.name}
				</TextDisplay>
				<SelectTimeRange onSelect={setTimeRange} />
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<OverviewCard
					title={"Top Songs"}
					items={tracksToOverviewItems(topTracks?.items)}
					fullOverview={{
						link: "/dashboard/songs",
						text: "View your top 50 songs",
					}}
				/>
				<OverviewCard
					title={"Top Artists"}
					items={artistsToOverviewItems(topArtists?.items)}
					fullOverview={{
						link: "/dashboard/artists",
						text: "View your top 50 artists",
					}}
				/>
			</div>
		</>
	);
}

function tracksToOverviewItems(tracks?: TrackObject[]) {
	return tracks?.map((track) => {
		return {
			id: track.id,
			text: getDisplayString(track),
			image: track.album?.images[0].url,
			link: `/dashboard/songs/${track.id}`,
		};
	});
}

function artistsToOverviewItems(artists?: ArtistObject[]) {
	return artists?.map((artist) => {
		return {
			id: artist.id,
			text: artist.name,
			image: artist.images ? artist.images[0].url : undefined,
			link: `/dashboard/artists/${artist.id}`,
		};
	});
}
