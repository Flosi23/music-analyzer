import RangeSelector from "@components/atoms/RangeSelector";

export default function Page() {
	return (
		<div className="flex flex-col h-full w-1/3 p-4">
			<RangeSelector
				defaultRange={{ from: 10, to: 70 }}
				minValue={0}
				maxValue={80}
				label="Popularity"
			/>
		</div>
	);
}
