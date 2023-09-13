interface Props {
	bgColor: string;
	textColor: string;
	name: string;
}

export default function ColorSchemeCard({ bgColor, textColor, name }: Props) {
	return (
		<div className={`${bgColor} ${textColor} h-52 p-4 rounded-lg`}>
			<p>{name}</p>
		</div>
	);
}
