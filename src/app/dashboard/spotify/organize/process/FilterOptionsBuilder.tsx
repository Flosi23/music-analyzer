import { FilterOptions, GenreMatchingType } from "@lib/organize/types";
import RangeSelector, { Range } from "@components/molecules/RangeSelector";
import ToggleButton from "@components/atoms/ToggleButton";
import Collapsable from "@components/atoms/Collapsable";
import Button from "@components/atoms/Button";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export interface ExtendedFilterOptions extends FilterOptions {
	groupByGenre: boolean;
}

interface Props {
	onGenerate: (options: ExtendedFilterOptions) => void;
}

export default function FilterOptionsBuilder({ onGenerate }: Props) {
	const [groupByGenre, setGroupByGenre] = useState(false);
	const [danceability, setDanceability] = useState<Range>({ from: 0, to: 1 });
	const [energy, setEnergy] = useState<Range>({ from: 0, to: 1 });
	const [valence, setValence] = useState<Range>({ from: 0, to: 1 });
	const [instrumentalness, setInstrumentalness] = useState<Range>({
		from: 0,
		to: 1,
	});
	const [tempo, setTempo] = useState<Range>({ from: 0, to: 250 });
	const [acousticness, setAcousticness] = useState<Range>({ from: 0, to: 1 });
	const [speechiness, setSpeechiness] = useState<Range>({ from: 0, to: 1 });
	const [liveness, setLiveness] = useState<Range>({ from: 0, to: 1 });

	const onClick = () => {
		const options: ExtendedFilterOptions = {
			groupByGenre,
			genres: {
				values: [],
				matchingType: GenreMatchingType.MATCH_ONE,
			},
			audioFeatures: {
				danceability,
				energy,
				valence,
				instrumentalness,
				tempo,
				acousticness,
				speechiness,
				liveness,
			},
		};
		onGenerate(options);
	};

	return (
		<div className="flex flex-col h-full gap-4">
			<ToggleButton
				label="Group selection by genre"
				defaultValue={false}
				onChange={setGroupByGenre}
			/>
			<RangeSelector
				minValue={0}
				maxValue={1}
				label="Danceability"
				tooltip="Danceability describes how suitable a track is for dancing. A value of 0.0 is least danceable and 1.0 is most danceable."
				onChange={setDanceability}
			/>
			<RangeSelector
				minValue={0}
				maxValue={1}
				label="Energy"
				tooltip="Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy."
				onChange={setEnergy}
			/>
			<RangeSelector
				minValue={0}
				maxValue={1}
				label="Valence"
				tooltip="A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)."
				onChange={setValence}
			/>
			<RangeSelector
				minValue={0}
				maxValue={1}
				label="Instrumentalness"
				tooltip="Predicts whether a track contains no vocals. 'Ooh' and 'aah' sounds are treated as instrumental in this context. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0."
				onChange={setInstrumentalness}
			/>
			<Collapsable text="More options">
				<div className="flex flex-col gap-4 pt-4">
					<RangeSelector
						minValue={0}
						maxValue={250}
						label="Tempo (BPM)"
						tooltip="The overall estimated tempo of a track in beats per minute (BPM)."
						onChange={setTempo}
					/>
					<RangeSelector
						minValue={0}
						maxValue={1}
						label="Acousticness"
						tooltip="A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic."
						onChange={setAcousticness}
					/>
					<RangeSelector
						minValue={0}
						maxValue={1}
						label="Speechiness"
						tooltip="Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks."
						onChange={setSpeechiness}
					/>
					<RangeSelector
						minValue={0}
						maxValue={1}
						label="Liveness"
						tooltip="Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live."
						onChange={setLiveness}
					/>
				</div>
			</Collapsable>
			<Button onClick={onClick} className="mt-4 w-full">
				<div className="flex items-center gap-2">
					Generate
					<ArrowRightIcon className="w-5 h-5" />
				</div>
			</Button>
		</div>
	);
}
