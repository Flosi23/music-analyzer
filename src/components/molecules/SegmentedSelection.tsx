import BasicSegmentedSelection from "@components/atoms/BasicSegmentedSelection";
import TextTitle from "@components/text/TextTitle";
import TextBody from "@components/text/TextBody";

interface Props<T> {
	options: { value: T; name: string; description: string }[];
	defaultOption: T;
	onSelect: (item: T) => void;
}

export default function SegmentedSelection<T>({
	options,
	defaultOption,
	onSelect,
}: Props<T>) {
	const getIndexOfOption = (optionValue: T): number => {
		return options.findIndex((o) => o.value === optionValue);
	};

	const onSelectionChanged = (selectedIndex: number) => {
		onSelect(options[selectedIndex].value);
	};

	return (
		<BasicSegmentedSelection
			onSelect={onSelectionChanged}
			defaultSelection={getIndexOfOption(defaultOption)}>
			{options.map((option) => (
				<div key={`${option.value}`}>
					<TextTitle size="small">{option.name}</TextTitle>
					<TextBody size="medium">{option.description}</TextBody>
				</div>
			))}
		</BasicSegmentedSelection>
	);
}
