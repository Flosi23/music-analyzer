"use client";
import { useSearchParams } from "next/navigation";
import { useGetRequest } from "@lib/request/clientRequest";
import { SpotifyGetCurrentUsersTracksResponse } from "@app/api/spotify/me/tracks/route";
import Error from "@components/atoms/Error";
import { useState } from "react";
import LoadingAnimation from "@components/_illustrations/LoadingAnimation";
import TextBody from "@components/text/TextBody";
import LoadingProgressBar from "@components/molecules/LoadingProgressBar";

export default function Page() {
	const queryParameters = useSearchParams();
	const [loadingAnimationFinished, setLoadingAnimationFinished] =
		useState(false);

	const { error, errorMessage, loading, data } =
		useGetRequest<SpotifyGetCurrentUsersTracksResponse>(
			`/api/spotify/me/tracks?${queryParameters.toString()}`,
		);

	if (!loadingAnimationFinished) {
		return (
			<div className="flex m-auto w-fit h-full items-center justify-center gap-8 flex-col">
				<LoadingAnimation />
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

	return <></>;
}
