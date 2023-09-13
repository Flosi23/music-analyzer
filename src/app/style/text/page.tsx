import TextDisplay from "@components/text/TextDisplay";
import TextHeading from "@components/text/TextHeading";
import TextTitle from "@components/text/TextTitle";
import TextBody from "@components/text/TextBody";
import TextLabel from "@components/text/TextLabel";

export default function Home() {
	return (
		<div className="text-on-surface">
			<TextLabel size="small">The quick brown fox ...(LS)</TextLabel>
			<TextLabel size="medium">The quick brown fox ...(LM)</TextLabel>
			<TextLabel size="large">The quick brown fox ...(LL)</TextLabel>
			<TextBody size="small">The quick brown fox ...(BS)</TextBody>
			<TextBody size="medium">The quick brown fox ...(BM)</TextBody>
			<TextBody size="large">The quick brown fox ...(BL)</TextBody>
			<TextTitle size="small">The quick brown fox ...(TS)</TextTitle>
			<TextTitle size="medium">The quick brown fox ...(TM)</TextTitle>
			<TextTitle size="large">The quick brown fox ...(TL)</TextTitle>
			<TextHeading size="small">The quick brown fox ...(HS)</TextHeading>
			<TextHeading size="medium">The quick brown fox ...(HM)</TextHeading>
			<TextHeading size="large">The quick brown fox ...(HL)</TextHeading>
			<TextDisplay size="small">The quick brown fox ...(DS)</TextDisplay>
			<TextDisplay size="medium">The quick brown fox ...(DM)</TextDisplay>
			<TextDisplay size="large">The quick brown fox ...(DL)</TextDisplay>
		</div>
	);
}
