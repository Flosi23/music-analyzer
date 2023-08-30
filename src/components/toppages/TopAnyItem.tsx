import { SongArtistsText } from "@components/general/SongArtistsText";
import { TopItemType } from "@/src/lib/dataFetching";

export interface TopAnyItemProps {
	index: number;
	item: TopItemType;
	id: string;
}

export function TopAnyItem({ item, index, id }: TopAnyItemProps) {
	const category = item.hasOwnProperty("artists") ? "songs" : "artists";

	return (
		<div
			className={
				"accent-box mt-5 flex-auto w-full md:w-3/4 p-5 sm:p-3 flex flex-col sm:flex-row justify-between items-center last:mb-5"
			}>
			<div
				className={
					"flex w-full flex-row items-center font-bold sm:w-4/5"
				}>
				<div className="text-5xl pr-5">#{index + 4}</div>
				<p className={"text-3xl break-all break-normal"}>
					<SongArtistsText item={item} />
				</p>
			</div>
			<a
				className={"base-button mt-4 sm:mt-0 text-center"}
				href={`/dashboard/${category}/${id}`}>
				View More
			</a>
		</div>
	);
}
