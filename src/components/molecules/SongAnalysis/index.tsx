"use client";
import "./index.css";
import Card from "@components/atoms/Card";
import TextLabel from "@components/text/TextLabel";
import ProgressBar from "@components/atoms/ProgressBar";

interface Props {
	popularity?: number;
	danceability?: number;
	energy?: number;
	instrumentalness?: number;
	acousticness?: number;
	valence?: number;
	className?: string;
}

export default function Index({
	popularity,
	danceability,
	energy,
	instrumentalness,
	acousticness,
	valence,
	className,
}: Props) {
	return (
		<Card className={`flex flex-col justify-between ${className}`}>
			{popularity !== undefined && (
				<Bar
					name="Popularity"
					description="The popularity of the track. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are."
					value={popularity}
				/>
			)}
			{danceability !== undefined && (
				<Bar
					name="Danceability"
					description="Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity."
					value={danceability}
				/>
			)}
			{energy !== undefined && (
				<Bar
					name="Energy"
					description="Energy represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy."
					value={energy}
				/>
			)}
			{instrumentalness !== undefined && (
				<Bar
					name="Instrumentalness"
					description={`Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal".`}
					value={instrumentalness}
				/>
			)}
			{acousticness !== undefined && (
				<Bar
					name="Acousticness"
					description="A confidence measure of whether the track is acoustic."
					value={acousticness}
				/>
			)}
			{valence !== undefined && (
				<Bar
					name="Valence"
					description="A measure describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)."
					value={valence}
				/>
			)}
		</Card>
	);
}

interface BarProps {
	name: string;
	description: string;
	value: number;
}

function Bar({ name, value, description }: BarProps) {
	return (
		<div className="relative cursor-pointer bar mb-2">
			<TextLabel size="medium">{name}</TextLabel>
			<ProgressBar value={value} min={0} max={1} />
			<div className="shadow-2xl text-on-primary transition-all absolute z-20 p-2 rounded-xl opacity-0 pointer-events-none bg-primary top-100 mt-2 desc">
				{description}
			</div>
		</div>
	);
}
