import LoadingAnimation from "@components/_illustrations/LoadingAnimation";

export default function Page() {
	return (
		<LoadingAnimation
			songs={[
				{
					name: "Sweetie Little Jean",
					artist: "Cage The Elephant",
				},
				{
					name: "UH YEAH [WAHSINN 01]",
					artist: "TJ_beastboy",
				},
				{
					name: "2 Arabesques: Arabesque No. 1",
					artist: "Claude Debussy",
				},
				{
					name: "Playground (from the series Arcane League of Legends)",
					artist: "Bea Miller, Arcane, League of Legends, Avenged Sevenfold",
				},
			]}
		/>
	);
}
