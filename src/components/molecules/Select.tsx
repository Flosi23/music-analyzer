import Button from "@components/atoms/Button";
import { useState } from "react";
import TextLabel from "@components/text/TextLabel";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface Props<T> {
	options: { value: T; name: string }[];
	defaultOption: T;
	onSelect: (item: T) => void;
}

export default function Select<T>({
	options,
	defaultOption,
	onSelect,
}: Props<T>) {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState<T>(defaultOption);

	const select = (newSelected: T) => {
		setSelected(newSelected);
		onSelect(newSelected);
	};
	const toggleOpen = () => {
		setOpen(!open);
	};

	return (
		<div className="relative">
			<Button onClick={toggleOpen}>
				<div className="flex items-center gap-1">
					<TextLabel size="large">
						{
							options.find((option) => option.value === selected)
								?.name
						}
					</TextLabel>
					<ChevronDownIcon
						className={`w-6 mt-1 transition-all ${
							open ? "rotate-0" : "-rotate-90"
						}`}
					/>
				</div>
				{open && (
					<div className="absolute z-10 shadow-2xl w-max bg-white rounded-lg top-full mt-2 right-0 p-2">
						{options.map(({ value, name }) => (
							<div
								key={`${value}`}
								onClick={() => select(value)}
								className="w-full rounded-lg text-black p-2 hover:bg-primary-container hover:text-on-primary-container">
								<TextLabel size="large">{name}</TextLabel>
							</div>
						))}
					</div>
				)}
			</Button>
		</div>
	);
}
