interface Props {
	value?: number;
	min?: number;
	max?: number;
	backgroundColor?: string;
	color?: string;
	className?: string;
}

export default function ProgressBar({
	value = 0,
	max = 100,
	min = 0,
	backgroundColor = "bg-white",
	color = "bg-primary-container-high",
	className,
}: Props) {
	const progressInPercent = (value / (max - min)) * 100;

	return (
		<div
			className={`flex rounded-full mt-1 overflow-hidden w-full h-4 ${className}`}>
			<div
				style={{ width: `${progressInPercent}%` }}
				className={`${color} rounded-r-full z-10`}
			/>
			<div
				style={{
					width: `calc(${100 - progressInPercent}% + 10%)`,
					marginLeft: "-10%",
				}}
				className={`rounded-r-full ${backgroundColor}`}
			/>
		</div>
	);
}
