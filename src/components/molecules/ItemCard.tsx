import Card from "@components/atoms/Card";
import TextTitle from "@components/text/TextTitle";
import Link from "next/link";

interface Props {
	image?: string;
	link: string;
	name?: string;
	imageHeight?: string;
}

export default function ItemCard({
	image,
	name,
	link,
	imageHeight = "h-44",
}: Props) {
	return (
		<Link href={link}>
			<Card className="h-full flex flex-wrap items-center justify-between gap-4">
				<TextTitle
					size="medium"
					className="overflow-ellipsis overflow-hidden">
					{name}
				</TextTitle>
				<div className={`bg-white p-3 rounded-lg ${imageHeight}`}>
					<img
						className="rounded-lg bg-white h-full"
						src={image}
						alt="cover"
					/>
				</div>
			</Card>
		</Link>
	);
}
