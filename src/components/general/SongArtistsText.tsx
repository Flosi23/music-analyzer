import { NowPlayingType, TopItemType, TopSongType } from "@lib/dataFetching";

interface SongArtistsTextProps {
	item: TopItemType | NowPlayingType;
}

export function SongArtistsText({ item }: SongArtistsTextProps) {
	if (item.hasOwnProperty("artists")) {
		return (
			<>
				{item.name}&nbsp;
				<i>
					(
					{(item as TopSongType).artists
						.map((artist: { name: string }) => artist.name)
						.join(", ")}
					)
				</i>
			</>
		);
	}

	return <>{item.name}</>;
}
