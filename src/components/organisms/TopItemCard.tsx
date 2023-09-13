import Card from "@components/atoms/Card";
import TextTitle from "@components/text/TextTitle";
import Button from "@components/atoms/Button";
import ShadowBox from "@components/atoms/ShadowBox";
import TextHeading from "@components/text/TextHeading";
import Link from "next/link";

interface Props {
	rank: number;
	link?: string;
	text?: string;
	image?: string;
	className?: string;
}

export default function TopItemCard({
	rank,
	link,
	text,
	image,
	className,
}: Props) {
	return (
		<Card
			className={`flex items-center gap-3 justify-between ${className}`}>
			<div className={rank > 3 ? "flex items-center gap-8" : ""}>
				<TextHeading size={rank == 1 ? "large" : "small"}>
					#{rank}
				</TextHeading>
				<TextTitle size="medium">{text}</TextTitle>
			</div>
			{rank < 4 ? (
				<ShadowBox
					size={rank == 1 ? 1 : 0.5}
					className="min-w-max"
					color={"shadow-primary-container-low"}>
					<img
						className={`rounded-lg ${rank == 1 ? "w-52" : "h-24"}`}
						src={image}
						alt=""
					/>
				</ShadowBox>
			) : (
				<div className="min-w-max">
					<Link href={link ?? ""}>
						<Button onClick={() => {}}>View more</Button>
					</Link>
				</div>
			)}
		</Card>
	);
}
