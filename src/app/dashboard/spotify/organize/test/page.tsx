"use client";
import RangeSelector from "@components/atoms/RangeSelector";
import ToggleButton from "@components/atoms/ToggleButton";

export default function Page() {
	return (
		<div className="grid grid-cols-4 gap-8">
			<div className="flex flex-col h-full gap-4">
				<RangeSelector minValue={0} maxValue={1} label="Danceability" />
				<RangeSelector minValue={0} maxValue={1} label="Energy" />
				<RangeSelector minValue={0} maxValue={1} label="Valence" />
				<RangeSelector
					minValue={0}
					maxValue={1}
					label="Instrumentalness"
				/>
				<RangeSelector minValue={0} maxValue={200} label="Tempo" />
				<RangeSelector minValue={0} maxValue={1} label="Acousticness" />
				<RangeSelector minValue={0} maxValue={1} label="Speechiness" />
				<RangeSelector minValue={0} maxValue={1} label="Liveness" />
			</div>
			<div>
				<ToggleButton label="Group selection by Genre" />
			</div>
		</div>
	);
}
