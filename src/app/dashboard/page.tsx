"use client";
import { TopItemsBox } from "@components/dashboard/TopItemsBox";
import React from "react";
import { BigHeading } from "@components/general/BigHeading";
import { MeType, useSpotifyApi } from "@/src/lib/dataFetching";
import Loading from "@components/general/Loading";

export default function Dashboard() {
	const [data, session, loading] = useSpotifyApi<MeType>(
		`${process.env.API_URL}/spotify/me`,
	);

	if (loading) {
		return (
			<div className="flex justify-center items-center w-full h-full">
				<Loading />
			</div>
		);
	}

	if (!session) return <></>;

	return (
		<>
			<BigHeading>
				<>
					Hey,{" "}
					<span className={"underline"}>
						@{!!data && data.displayName}
					</span>
				</>
			</BigHeading>
			<div className="w-full flex flex-col lg:flex-row justify-center space-between">
				<TopItemsBox category={"Songs"} />
				<TopItemsBox category={"Artists"} />
			</div>
		</>
	);
}
