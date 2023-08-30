import React from "react";
import { ShadowButton } from "@components/general/ShadowButton";
import { InfoTile } from "@components/general/InfoTile";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function Home() {
	return (
		<>
			<div className="flex bg-accent-dark items-center flex-col min-h-screen h-max">
				<main
					className={
						"w-full lg:w-box-normal flex flex-col items-center"
					}>
					<div className={"w-full h-3 lg:h-13v"}></div>
					<div className={"px-3"}>
						<h1
							className={
								"text-left mb-2 text-6xl sm:text-8xl lg:text-9xl xl:text-title font-bold"
							}>
							Music Analy_er
						</h1>
						<h2
							className={
								"text-xl sm:text-2xl lg:text-4xl font-semibold"
							}>
							Get the most out of you listening activity
						</h2>
					</div>

					<ShadowButton text={"Sign in with Spotify"} />
					<div
						className={
							"px-3 sm:px-5 md:px-14 w-full flex flex-col justify-start items-center"
						}>
						<InfoTile
							title={"Your Top Songs & Artists"}
							text={
								"Unleash musical insights like never before. Our integrated music analyzer showcases your top 50 artists and tracks from Spotify. Customize the time period and effortlessly generate playlists from your favorites."
							}>
							<div
								className={
									"flex flex-row sm:flex-col justify-start w-full sm:w-auto"
								}>
								<span
									className={
										"font-black text-7xl md:text-[9rem] self-start pr-16"
									}>
									50
								</span>
								<p
									className={
										"font-bold text-3xl md:text-4xl self-end"
									}>
									Songs&nbsp;&
									<br />
									Artists
								</p>
							</div>
						</InfoTile>
						<InfoTile
							title={"Genre-Tracking"}
							right
							text={
								"Track favorite genres over time. Our analyzer monitors preferences, reveals trends, and expands your musical palette. Elevate your Spotify experience with personalized insights. Stay connected to evolving tastes."
							}>
							<div
								className={"flex flex-col items-center w-full"}>
								<div className={"genre-card"}>Rap</div>
								<div className={"genre-card"}>Hip Hop</div>
								<div className={"genre-card"}>Rock</div>
								<div className={"genre-card"}>Cinematic</div>
							</div>
						</InfoTile>
						<InfoTile
							title={"Privacy & Transparency"}
							text={
								"Experience privacy and freedom with our open-source music analyzer. Customized to suit your needs and keep your data secure. Elevate your music analysis while enjoying complete control. Discover the advantages of openness today."
							}>
							<div
								className={
									"flex justify-center items-center w-full sm:w-auto"
								}>
								<ShieldCheckIcon className={"w-44 md:w-52"} />
							</div>
						</InfoTile>
					</div>
				</main>
			</div>
		</>
	);
}
