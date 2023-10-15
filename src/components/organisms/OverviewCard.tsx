import Card from "@components/atoms/Card";
import TextBody from "@components/text/TextBody";
import TextHeading from "@components/text/TextHeading";
import ShadowCard from "@components/molecules/ShadowCard";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface Props {
	title?: string;
	items?: { id?: string; text?: string; image?: string; link: string }[];
	fullOverview: { link: string; text: string };
}

export default function OverviewCard({ title, items, fullOverview }: Props) {
	const selectedItems = items?.slice(
		Math.min(items.length - 1, 1),
		Math.max(6, items.length),
	);

	return (
		<Card className="flex flex-col">
			<TextHeading size="medium" className="mb-5">
				{title}
			</TextHeading>
			<Link href={items ? items[0].link : ""}>
				<ShadowCard
					shadowSize={1.3}
					color="bg-white"
					shadowColor="shadow-primary-container-high"
					textColor="text-black"
					className="flex justify-between items-center gap-5">
					<div>
						<TextHeading size="medium">#1</TextHeading>
						<TextBody size="large">
							{items && items[0] ? items[0].text : ""}
						</TextBody>
					</div>
					<img
						src={items && items[0] ? items[0].image : ""}
						className="rounded-xl h-32"
						alt=""
					/>
				</ShadowCard>
			</Link>
			<div className="flex flex-col justify-between h-full mt-5 ml-1">
				<div className="flex flex-col gap-2">
					{selectedItems?.map(({ text, id, link }, index) => (
						<Link href={link} key={id}>
							<TextBody size="medium" className="hover:underline">
								<b>{index + 2}</b> {text}
							</TextBody>
						</Link>
					))}
				</div>
				<Link
					href={fullOverview?.link}
					className="flex gap-2 items-center mt-5">
					<ArrowTopRightOnSquareIcon className="h-6" />
					<TextBody size="small" className="hover:underline">
						{fullOverview?.text}
					</TextBody>
				</Link>
			</div>
		</Card>
	);
}
