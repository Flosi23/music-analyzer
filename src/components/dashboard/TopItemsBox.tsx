import { TopItem } from "@components/dashboard/TopItem";
import React from "react";
import Link from "next/link";
import {
	TopItemsResponse,
	TopItemType,
	useSpotifyApi,
} from "@lib/dataFetching";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

interface TopItemProps {
	category: "Songs" | "Artists";
}

export function TopItemsBox({ category }: TopItemProps) {
	const [data, session] = useSpotifyApi<TopItemsResponse>(
		`${
			process.env.API_URL
		}/spotify/top${category.toLowerCase()}?limit=5&time=medium_term`,
	);

	if (!session) return null;

	return (
		<div
			className={
				"accent-box w-full w-100 mr-6 p-6 flex flex-col mb-6 last:mr-0"
			}>
			<p className="font-bold text-6xl mb-2">Top {category}</p>
			<div className="flex flex-col justify-start my-1">
				{!!data &&
					data.items.map((item: TopItemType, i: number) => (
						<TopItem item={item} index={i} key={i} />
					))}
			</div>
			<Link
				className={
					"font-roboto-mono hover:underline cursor-pointer mt-1.5"
				}
				href={`/dashboard/${category.toLowerCase()}`}>
				<ArrowTopRightOnSquareIcon className={"w-5 inline-block"} />
				View your Top 50 {category}
			</Link>
		</div>
	);
}
