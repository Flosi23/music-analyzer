import Card from "@components/atoms/Card";
import Chip from "@components/atoms/Chip";
import ItemInfoTable from "@components/atoms/ItemInfoTable";

interface Props {
	album?: string;
	releaseDate?: string;
	keyAndMode?: string;
	bpm?: number;
	durationMS?: number;
	genres?: string[];
	className?: string;
}

export default function SongInfo({
	album,
	releaseDate,
	keyAndMode,
	bpm,
	durationMS,
	genres,
	className,
}: Props) {
	function millisToMinutesAndSeconds(ms?: number) {
		if (ms === undefined) return undefined;

		const minutes = Math.floor(ms / 60000);
		const seconds = ((ms % 6000) / 1000).toFixed(0);
		return `${minutes}:${seconds.toString().padStart(2, "0")} min`;
	}

	return (
		<Card className={`flex flex-col justify-between ${className}`}>
			<ItemInfoTable
				rows={[
					{ label: "Album", value: album },
					{ label: "Release", value: releaseDate },
					{ label: "Key", value: keyAndMode },
					{ label: "BPM", value: bpm },
					{
						label: "Duration",
						value: millisToMinutesAndSeconds(durationMS),
					},
				]}
			/>
			<div className="flex flex-wrap gap-2 mt-5">
				{genres
					?.slice(0, Math.min(genres?.length, 6))
					.map((genre) => <Chip key={genre}>{genre}</Chip>)}
			</div>
		</Card>
	);
}
