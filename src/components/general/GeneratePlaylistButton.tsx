import { ClipLoader } from "react-spinners";
import {
	CheckCircleIcon,
	ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";

import { useSession } from "next-auth/react";

interface GeneratePlaylistButtonProps {
	timeRange: string;
}

export function GeneratePlaylistButton({
	timeRange,
}: GeneratePlaylistButtonProps) {
	const { data: session }: any = useSession();
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const generateTopSongsPlaylist = () => {
		setSuccess(false);
		setError(false);
		setLoading(true);
		if (!session) return;

		fetch(
			`${process.env.API_URL}/spotify/generateplaylistsongs?limit=50&time_range=${timeRange}`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${session?.user.accessToken}`,
				},
			},
		).then((res) => {
			setLoading(false);
			if (res.status == 201) {
				setError(false);
				setSuccess(true);
				return;
			}
			setError(true);
			setSuccess(false);
		});
	};
	return (
		<button
			className={
				"flex flex-row items-center base-button mb-2 md:mb-0 md:mr-2"
			}
			onClick={generateTopSongsPlaylist}>
			<span>Generate&nbsp;Playlist</span>
			{(loading || success || error) && <span className={"w-2"}></span>}
			<ClipLoader
				size={20}
				loading={loading}
				speedMultiplier={1}
				color={"white"}
			/>
			{success && <CheckCircleIcon className={"w-5 fill-green-500"} />}
			{error && (
				<ExclamationTriangleIcon className={"w-5 fill-red-500"} />
			)}
		</button>
	);
}
