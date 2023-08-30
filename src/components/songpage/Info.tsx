interface InfoProps {
	album: string;
	releaseDate: string;
	releaseDatePrecision: string;
	keyl: string;
	mode: string;
	bpm: Number;
	durationMs: number;
	genres: string[];
}

import GenresNames from "../general/GenresNames";

const Info = ({
	album,
	releaseDate,
	releaseDatePrecision,
	durationMs,
	keyl, //keyl because key is a reserved word
	mode,
	bpm,
	genres,
}: InfoProps) => {
	const durationMin: number = durationMs / 60000;
	//convert number after . to seconds
	let durationSec: number | string =
		(durationMin - Math.floor(durationMin)) * 60;
	const duration: string = `${Math.floor(durationMin)}:${
		durationSec < 10
			? "0" + Math.floor(durationSec)
			: Math.floor(durationSec)
	}min`;
	return (
		<div className="flex flex-col justify-start h-full w-full p-5 items-start">
			<table className="gap-10">
				<tbody>
					<InfoTile title="Album" value={album} />
					<InfoTile
						title="Release Date"
						value={new Date(releaseDate).toDateString()}
					/>
					<InfoTile title="Key" value={keyl} />
					<InfoTile title="Mode" value={mode} />
					<InfoTile title="BPM" value={bpm.toString()} />
					<InfoTile title="Duration" value={duration} />
				</tbody>
			</table>
			<GenresNames genres={genres} />
		</div>
	);
};

interface InfoTileProps {
	title: string;
	value: string;
}

const InfoTile = ({ title, value }: InfoTileProps) => {
	return (
		<tr className="">
			<td className=" text-xl font-bold pr-2">{title}</td>
			<td className="text-xl break-words">{value}</td>
		</tr>
	);
};

export default Info;
