"use client";
import { useSession } from "next-auth/react";
import TextDisplay from "@components/text/TextDisplay";
import IllustratedCard from "@components/molecules/IllustratedCard";

export default function Page() {
	const session = useSession();

	return (
		<>
			<TextDisplay size="small" className="w-min sm:w-fit">
				Hey, @{session.data?.user?.name}
			</TextDisplay>
			<div className={"grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10"}>
				<IllustratedCard
					heading="Stats"
					text="Get more insight on your listening activity"
					image="/illustrations/stats.svg"
					link="/dashboard/spotify/stats"
				/>
				<IllustratedCard
					heading="Organize"
					text="Organize your music library. Group songs by genres, popularity, mood and more"
					image="/illustrations/organize.svg"
					link="/dashboard/spotify/stats"
				/>
			</div>
		</>
	);
}
