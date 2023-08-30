"use client";

import { MeType, NowPlayingType, useSpotifyApi } from "@lib/dataFetching";
import React, { Fragment } from "react";
import { signOut } from "next-auth/react";

import { SongArtistsText } from "@components/general/SongArtistsText";
import { Menu, Transition } from "@headlessui/react";

export function Header() {
	const [nowPlayingData, session] = useSpotifyApi<NowPlayingType>(
		`${process.env.API_URL}/spotify/nowplaying`,
	);
	const [meData, _] = useSpotifyApi<MeType>(
		`${process.env.API_URL}/spotify/me`,
	);

	if (!session) return null;

	return (
		<header>
			<nav className="bg-accent-dark px-4 lg:px-6 py-2.5 sticky">
				<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
					<a href="/dashboard" className="flex items-center">
						<div className={"w-16 mr-6"}>
							<img
								src="/Logo3.png"
								className="w-full object-contain"
								alt="Music Analyzer Logo"
							/>
						</div>
						<div>
							<p className="block text-3xl leading-7 font-bold  text-white">
								Music
								<br />
								Analy_er
							</p>
						</div>
					</a>
					<div className="flex justify-between lg:order-2 relative">
						<div className="flex flex-col mr-10 text-xl leading-6">
							{!!nowPlayingData && nowPlayingData.isPlaying && (
								<>
									<p className="font-semibold">
										Now playing:
									</p>
									<a
										className="hover:underline"
										href={`/dashboard/songs/${nowPlayingData.id}`}>
										<SongArtistsText
											item={nowPlayingData}
										/>
									</a>
								</>
							)}
						</div>
						<Menu
							as="div"
							className="relative inline-block text-left">
							<div>
								<Menu.Button className="flex justify-center items-center">
									<div className="w-12">
										<img
											className="w-full rounded-full"
											src={
												meData?.images[0]
													? meData?.images[0]
													: "/userprofileimg.png"
											}
											alt="sus"
										/>
									</div>
								</Menu.Button>
							</div>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95">
								<Menu.Items
									className={
										"absolute right-0 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-accent-shadow shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
									}>
									<div className="px-1 py-1">
										<Menu.Item>
											{({ active }) => (
												<button
													className={`${
														active
															? "bg-accent-800"
															: ""
													} text-white  group flex w-full items-center rounded-md px-2 py-2 text-md`}
													onClick={() =>
														signOut({
															redirect: true,
															callbackUrl: `${process.env.APP_URL}`,
														})
													}>
													Logout
												</button>
											)}
										</Menu.Item>
									</div>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
				</div>
			</nav>
			<hr className={"w-full sm:mb-2 h-1 bg-accent-box border-0"} />
		</header>
	);
}
