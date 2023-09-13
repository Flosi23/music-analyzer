"use client";
import TextDisplay from "@components/text/TextDisplay";
import TextHeading from "@components/text/TextHeading";
import ShadowButton from "@components/molecules/ShadowButton";
import { signIn } from "next-auth/react";
import Container from "@components/atoms/Container";

export default function Page() {
	return (
		<Container>
			<div className="text-on-surface mt-20">
				<TextDisplay size="large" className="text-primary">
					Music Analy_er
				</TextDisplay>
				<TextHeading size="small">
					Get the most out of your listening activity
				</TextHeading>
				<div className="w-full mt-20 flex justify-center">
					<ShadowButton
						text={"Sign in with Spotify"}
						onClick={() => {
							signIn(undefined, { callbackUrl: "/dashboard" });
						}}></ShadowButton>
				</div>
			</div>
		</Container>
	);
}
