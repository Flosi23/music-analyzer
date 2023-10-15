"use client";
import TextHeading from "@components/text/TextHeading";
import TextBody from "@components/text/TextBody";
import OrderedList from "@components/atoms/OrderedList";
import ShadowButton from "@components/molecules/ShadowButton";
import TextTitle from "@components/text/TextTitle";
import OrganizeIllustration from "@components/_illustrations/OrganizeIllustration";
import Link from "next/link";

export default function Page() {
	return (
		<>
			<TextHeading size="medium" className="mb-5">
				Organize
			</TextHeading>
			<div className="grid lg:grid-cols-2 gap-4">
				<TextBody size="medium" className="flex flex-col gap-4">
					<div className="mb-2">
						Organize your music library. Group selected songs by
						genre, speed, mood and more.
					</div>
					<OrderedList>
						<TextBody size="medium">
							Select the tracks you want to organize
						</TextBody>
						<TextBody size="medium">
							Select the grouping criteria.
						</TextBody>
						<TextBody size="medium">
							Let our algorithm do it's magic
						</TextBody>
						<TextBody size="medium">
							Choose which playlists you want to save to your
							Spotify account and which not
						</TextBody>
					</OrderedList>
				</TextBody>
				<OrganizeIllustration
					animated={true}
					className="w-full hidden lg:block"
				/>
			</div>
			<Link href="/dashboard/spotify/organize/select">
				<ShadowButton onClick={() => {}} className="mt-4">
					<TextTitle size={"medium"}>Start organizing</TextTitle>
				</ShadowButton>
			</Link>
		</>
	);
}
