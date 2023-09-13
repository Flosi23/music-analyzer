import TopItemCard from "@components/organisms/TopItemCard";
import Link from "next/link";

interface Item {
	link?: string;
	text?: string;
	image?: string;
}

interface Props {
	items: Item[];
}

export default function TopItems({ items }: Props) {
	const top3items = items.slice(0, Math.min(3, items.length));
	const otherItems = items.slice(Math.min(3, items.length - 1), items.length);

	return (
		<>
			<div className="grid grid-cols-2 mt-7 grid-rows-2 gap-4">
				{top3items.map((item, i) => (
					<Link
						key={i + 1}
						href={item.link ?? ""}
						className={i == 0 ? "row-span-2" : ""}>
						<TopItemCard
							rank={i + 1}
							text={item.text}
							image={item.image}
							link={item.link}
							className="h-full"
						/>
					</Link>
				))}
			</div>
			<div className="mt-4 flex flex-col gap-4 mx-32">
				{otherItems.map((item, i) => (
					<TopItemCard
						key={i + 4}
						rank={i + 4}
						text={item.text}
						image={item.image}
						link={item.link}
					/>
				))}
			</div>
		</>
	);
}
