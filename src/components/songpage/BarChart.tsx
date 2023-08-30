import React from "react";

//bar chart for the song page with the audio features

interface BarChartProps {
	popularity: number;
	danceability: number;
	energy: number;
	loudness: number;
	speechiness: number;
	acousticness: number;
	instrumentalness: number;
	liveness: number;
	valence: number;
}

const BarChart = ({
	popularity,
	danceability,
	energy,
	loudness,
	speechiness,
	acousticness,
	instrumentalness,
	liveness,
	valence,
}: BarChartProps) => {
	return (
		<div
			className="flex flex-col justify-around h-full mx-2 py-2 w-full"
			data-theme="songpreview">
			<Bar name="Popularity" value={popularity} max={100} />
			<Bar name="Danceability" value={danceability} max={1} />
			<Bar name="Energy" value={energy} max={1} />
			<Bar name="Loudness" value={loudness + 60} max={60} />{" "}
			{/* spotify return between -60 and 0 */}
			<Bar name="Speechiness" value={speechiness} max={1} />
			<Bar name="Acousticness" value={acousticness} max={1} />
			<Bar name="Instrumentalness" value={instrumentalness} max={1} />
			<Bar name="Liveness" value={liveness} max={1} />
			<Bar name="Valence" value={valence} max={1} />
		</div>
	);
};

export default BarChart;

interface BarProps {
	name: string;
	value: number;
	max: number;
}

const Bar = ({ name, value, max }: BarProps) => {
	return (
		<>
			<p className=" text-white mx-1">{name}</p>
			<progress
				className="progress progress-primary w-full"
				value={value}
				max={String(max)}></progress>
		</>
	);
};
