import { CoverImage } from "@components/general/CoverImage";
import React from "react";
import { SongArtistsText } from "@components/general/SongArtistsText";
import { TopItemType, TopSongType } from "@lib/dataFetching";

export interface TopOneItemProps {
	item: TopItemType;
}

export function TopOneItem({ item }: TopOneItemProps) {
	return (
		<>
			<a
				className={"h-full accent-box flex flex-row p-6 cursor-pointer"}
				href={`${
					(item as TopSongType).artists === undefined
						? "artists"
						: "songs"
				}/${item.id}`}>
				<div className="flex text-white flex-col w-3/5">
					<p className="font-black text-6xl">#1</p>
					<p className="font-bold text-3xl pr-2">
						<SongArtistsText item={item} />
					</p>
				</div>
				<div className={"w-2/5 h-full flex items-center"}>
					<div
						className={
							" flex rounded-xl bg-accent-white shadow-box-sm lg:shadow-box-md items-center"
						}>
						<CoverImage imageUrl={item.imageUrl} />
					</div>
				</div>
			</a>
		</>
	);
}
