import { CoverImage } from "@components/general/CoverImage";
import { SongArtistsText } from "@components/general/SongArtistsText";
import { TopAnyItemProps } from "@components/toppages/TopAnyItem";
import { TopSongType } from "@lib/dataFetching";

export function TopThreeItem({ item, index }: TopAnyItemProps) {
	return (
		<>
			<a
				className={
					"accent-box py-4 px-6 flex flex-row items-center justify-start h-full cursor-pointer"
				}
				href={`${
					(item as TopSongType).artists === undefined
						? "artists"
						: "songs"
				}/${item.id}`}>
				<div className={"flex flex-row items-center font-bold w-4/5"}>
					<div className="text-5xl box-border pr-5">#{index + 1}</div>
					<p className={"text-3xl"}>
						<SongArtistsText item={item} />
					</p>
				</div>
				<div className={"w-1/5"}>
					<CoverImage imageUrl={item.imageUrl} rounded />
				</div>
			</a>
		</>
	);
}
