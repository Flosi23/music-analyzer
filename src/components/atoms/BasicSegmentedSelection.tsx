import React, { PropsWithChildren, useState } from "react";

interface Props {
	className?: string;
	defaultSelection?: number;
	onSelect: (selectedIndex: number) => void;
}

export default function BasicSegmentedSelection({
	children,
	className,
	defaultSelection,
	onSelect,
}: PropsWithChildren<Props>) {
	const [selectedSegment, setSelectedSegment] = useState<number | undefined>(
		defaultSelection,
	);

	const changeSelection = (selectedIndex: number) => {
		setSelectedSegment(selectedIndex);
		onSelect(selectedIndex);
	};

	return (
		<div className={`border-2 border-primary rounded-3xl ${className}`}>
			{React.Children.map(children, (child, i) => (
				<div
					onClick={() => changeSelection(i)}
					className={`${i > 0 ? "border-t-2 border-primary" : ""} ${
						selectedSegment == i ? "bg-primary-surface" : ""
					} ${i == 0 ? "rounded-tl-3xl rounded-tr-3xl" : ""} ${
						i == React.Children.count(children) - 1
							? "rounded-bl-3xl rounded-br-3xl"
							: ""
					} px-6 py-2 cursor-pointer`}>
					{child}
				</div>
			))}
		</div>
	);
}
