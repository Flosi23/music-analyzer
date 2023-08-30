import { TopItemType } from "@lib/dataFetching";
import { SongArtistsText } from "@components/general/SongArtistsText";
import { CoverImage } from "@components/general/CoverImage";

interface TopItemProps {
	index: number;
	item: TopItemType;
}

export function TopItem({ index, item }: TopItemProps) {
	const category = item.hasOwnProperty("artists") ? "songs" : "artists";

	return (
		<div className="flex flex-row mt-2">
			{index > 0 ? (
				<p className="text-2xl text-white">
					<span className="font-bold box-border pr-1.5 w-4">
						{index + 1}
					</span>
					<a
						className={"hover:underline"}
						href={`/dashboard/${category}/${item.id}`}>
						<SongArtistsText item={item} />
					</a>
				</p>
			) : (
				<a
					className="relative flex flex-row justify-between shadow-box-[1rem] md:shadow-box"
					href={`/dashboard/${category}/${item.id}`}>
					<div className="flex text-black flex-col w-2/3">
						<p className="font-black text-6xl">#{index + 1}</p>
						<p className="text-3xl">
							<SongArtistsText item={item} />
						</p>
					</div>
					<div className="w-1/3">
						<CoverImage imageUrl={item.imageUrl} rounded />
					</div>
				</a>
			)}
		</div>
	);
}
