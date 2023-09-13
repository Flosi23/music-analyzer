import TextHeading from "@components/text/TextHeading";
import ShadowCard from "@components/molecules/ShadowCard";

interface Props {
	onClick: () => void;
	text: string;
}

export default function ShadowButton({ onClick, text }: Props) {
	return (
		<div
			className="hover:scale-110 transition-transform w-fit"
			onClick={onClick}>
			<ShadowCard
				shadowSize={1}
				textColor="text-on-primary"
				color="bg-primary"
				className="cursor-pointer">
				<TextHeading size="small">{text}</TextHeading>
			</ShadowCard>
		</div>
	);
}
