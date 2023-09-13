import "./index.css";

interface Props {
	color?: string;
	ringSize?: string;
	size?: number;
}

export default function Loading({
	color = "stroke-primary",
	ringSize = "stroke-2",
	size = 5,
}: Props) {
	return (
		<svg
			viewBox="0 0 50 50"
			className={`spinner ${color}`}
			style={{ fontSize: `${size}rem` }}>
			<circle
				className={`ring stroke-on-surface ${ringSize}`}
				cx="25"
				cy="25"
				r="22.5"
			/>
			<circle className={`line ${ringSize}`} cx="25" cy="25" r="22.5" />
		</svg>
	);
}
