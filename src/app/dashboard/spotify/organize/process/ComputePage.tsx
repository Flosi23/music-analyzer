"use client";
import { useGetRequest } from "@lib/request/clientRequest";
import { SpotifyGetCurrentUsersTracksResponse } from "@app/api/spotify/me/tracks/route";
import Error from "@components/atoms/Error";
import { useState } from "react";
import LoadingAnimation from "@components/_illustrations/LoadingAnimation";
import TextBody from "@components/text/TextBody";
import LoadingProgressBar from "@components/molecules/LoadingProgressBar";
import { Selection } from "@app/dashboard/spotify/organize/process/page";
import { SpotifyGetCurrentUsersTracksSampleResponse } from "@app/api/spotify/me/tracks/sample/route";
import { getRandomInt } from "@lib/helper";
import FilterPage from "@app/dashboard/spotify/organize/process/FilterPage";

interface Props {
	selection: Selection;
}

export default function ComputePage({ selection }: Props) {
	const [loadingAnimationFinished, setLoadingAnimationFinished] =
		useState(false);

	const { error, errorMessage, loading, data } =
		useGetRequest<SpotifyGetCurrentUsersTracksResponse>(
			`/api/spotify/me/tracks?${selectionToTracksApiQueryParameters(
				selection,
			).toString()}`,
		);

	const { data: sampleTracks } =
		useGetRequest<SpotifyGetCurrentUsersTracksSampleResponse>(
			`/api/spotify/me/tracks/sample?${selectionToSampleTracksApiQueryParameters(
				selection,
			).toString()}`,
		);

	if (!loadingAnimationFinished && sampleTracks) {
		return (
			<div className="flex m-auto w-fit h-full items-center justify-center gap-8 flex-col">
				<LoadingAnimation
					songs={sampleTracks.map((t) => {
						return {
							name: t.name,
							artist: t.artists ? t.artists[0].name : "",
						};
					})}
				/>
				<TextBody size="large" className="mb-4 mt-6">
					Loading all your selected tracks. This might take a while...
				</TextBody>
				<LoadingProgressBar
					durationMS={20000}
					finishEarly={!loading}
					onFinished={() => setLoadingAnimationFinished(true)}
				/>
			</div>
		);
	}

	if (error) {
		return <Error message={errorMessage} />;
	}

	if (data) {
		return <FilterPage songs={data} />;
	}

	return <></>;
}

function selectionToSampleTracksApiQueryParameters(
	selection: Selection,
): URLSearchParams {
	const urlSearchParams = new URLSearchParams();
	urlSearchParams.set("includeLikedSongs", `${selection.includeLikedSongs}`);
	if (selection.playlistIds.length > 0) {
		urlSearchParams.set(
			"playlistId",
			selection.playlistIds[
				getRandomInt(0, selection.playlistIds.length - 1)
			],
		);
	}
	return urlSearchParams;
}

function selectionToTracksApiQueryParameters(
	selection: Selection,
): URLSearchParams {
	const urlSearchParams = new URLSearchParams();
	urlSearchParams.set("includeLikedSongs", `${selection.includeLikedSongs}`);
	urlSearchParams.set("playlistIds", selection.playlistIds.join(","));
	return urlSearchParams;
}
