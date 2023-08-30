"use client";

import React, { useMemo, useState } from "react";
import { TopItemsResponse, useSpotifyApi } from "@/src/lib/dataFetching";

import { BigHeading } from "@components/general/BigHeading";
import { GeneratePlaylistButton } from "@components/general/GeneratePlaylistButton";
import TimeDropdown from "@components/general/TimeDropdown";
import { TopAnyItem } from "@components/toppages/TopAnyItem";
import { TopOneItem } from "@components/toppages/TopOneItem";
import { TopThreeItem } from "@components/toppages/TopThreeItem";
import Loading from "@components/general/Loading";

interface TopCategoryPageProps {
	category: string;
}

export default function TopCategoryPage({ category }: TopCategoryPageProps) {
	const [time, setTime] = useState<string>("medium_term");
	const url = useMemo(() => {
		return `${
			process.env.API_URL
		}/spotify/top${category.toLowerCase()}?limit=50&time=${time}`;
	}, [category, time]);

	const [data, session, loading] = useSpotifyApi<TopItemsResponse>(url);

	if (loading) {
		return (
			<div className="flex justify-center items-center w-full h-full">
				<Loading />
			</div>
		);
	}

	if (!session) return null;

	return (
		<>
			<div className={"flex flex-row justify-between items-center my-3"}>
				<BigHeading text={`Your Top ${category}`} />
				<div className={"flex flex-col md:flex-row items-end"}>
					{category.toLowerCase().includes("song") && (
						<GeneratePlaylistButton timeRange={time} />
					)}
					<TimeDropdown changeTime={setTime} />
				</div>
			</div>
			<div
				className={"grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-5"}>
				<div className={"col-span-1 row-span-2"}>
					{!!data && <TopOneItem item={data.items[0]} />}
				</div>
				{!!data &&
					data.items.slice(1, 3).map((item: any, i: number) => (
						<div className={"col-span-1 row-span-1"} key={item.id}>
							<TopThreeItem
								key={item.id}
								item={item}
								index={i + 1}
								id={item.id}
							/>
						</div>
					))}
			</div>
			<div className={"flex flex-col items-center"}>
				{!!data &&
					data.items
						.slice(3)
						.map((item: any, i: number) => (
							<TopAnyItem
								id={item.id}
								item={item}
								index={i}
								key={item.id}
							/>
						))}
			</div>
		</>
	);
}
