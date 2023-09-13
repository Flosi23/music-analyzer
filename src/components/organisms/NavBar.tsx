"use client";
import TextTitle from "@components/text/TextTitle";
import { useGetRequest } from "@lib/request/clientRequest";
import { SpotifyGetCurrentlyPlayingResponse } from "@app/api/spotify/me/currently-playing/route";
import TextBody from "@components/text/TextBody";
import { SpotifyGetCurrentUsersProfileResponse } from "@app/api/spotify/me/route";
import {
	CurrentlyPlayingObjectItem,
	TrackObject,
} from "@lib/spotify/generated";
import Link from "next/link";
import { getDisplayString } from "@lib/spotify/util";
import Loading from "@components/atoms/Loading";

export default function NavBar() {
	const { loading: cpLoading, data: cpData } =
		useGetRequest<SpotifyGetCurrentlyPlayingResponse>(
			"/api/spotify/me/currently-playing",
		);

	const { loading: meLoading, data: meData } =
		useGetRequest<SpotifyGetCurrentUsersProfileResponse>("/api/spotify/me");

	const showLoadingSpinner = meLoading || !meData;

	return (
		<div className="w-full py-4 flex justify-between items-center text-on-surface">
			<Link href="/dashboard" className="flex gap-5 items-center">
				<img
					className="h-16"
					src="https://dev.music-analyser.codeclub.check24.fun/Logo3.png"
				/>
				<TextTitle size="small" className="leading-7 h-fit">
					Music <br /> Analy_er
				</TextTitle>
			</Link>
			{showLoadingSpinner ? (
				<Loading size={3} />
			) : (
				<div className="flex items-center gap-5">
					{cpData?.is_playing && (
						<div>
							<TextBody size="small" bold={true}>
								Now Playing:
							</TextBody>
							<TextBody size="small">
								{getDisplayText(cpData.item)}
							</TextBody>
						</div>
					)}
					<img
						src={
							meData?.images && meData.images[0]
								? meData?.images[0].url
								: "/userprofileimg.jpg"
						}
						alt="profile image"
						className="rounded-full w-14 h-14"
					/>
				</div>
			)}
		</div>
	);
}

function getDisplayText(item: CurrentlyPlayingObjectItem | undefined) {
	if (!item) return "";
	if (isTrackObject(item)) {
		return getDisplayString(item);
	}

	return item.name;
}

function isTrackObject(item: CurrentlyPlayingObjectItem): item is TrackObject {
	return Object.hasOwn(item, "artists");
}
