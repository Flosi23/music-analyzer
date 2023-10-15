interface Props {
	value?: number;
	min?: number;
	max?: number;
	className?: string;
}

export default function ProgressBar({
	value = 0,
	max = 100,
	min = 0,
	className,
}: Props) {
	const progressInPercent = (value / (max - min)) * 100;

	return (
		<div
			className={`flex rounded-lg mt-1 overflow-hidden bg-primary-container-high w-full h-4 ${className}`}>
			<div
				style={{ width: `${progressInPercent}%` }}
				className="bg-white rounded-lg"
			/>
			<div
				style={{ width: `${100 - progressInPercent}%` }}
				className="rounded-lg"
			/>
		</div>
	);
}
