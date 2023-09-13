import Select from "@components/molecules/Select";

export type TimeRange = "short_term" | "medium_term" | "long_term";

export const defaultTimeRange: TimeRange = "short_term";

interface Option {
	name: string;
	value: TimeRange;
}

interface Props {
	onSelect: (item: TimeRange) => void;
}

export default function SelectTimeRange({ onSelect }: Props) {
	const options: Option[] = [
		{ name: "Short term", value: "short_term" },
		{ name: "Medium term", value: "medium_term" },
		{ name: "Long term", value: "long_term" },
	];

	return (
		<Select<TimeRange>
			options={options}
			defaultOption={defaultTimeRange}
			onSelect={onSelect}
		/>
	);
}
