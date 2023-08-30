import { NextRequest, NextResponse } from "next/server";
import {
	checkAuth,
	checkSpotifyRespose,
	checkUserInputTopItems,
} from "@lib/spotify/apiChecks";

interface parsedResponse {
	total: number;
	limit: number;
	items: [
		{
			album: {
				album_type: string;
				total_tracks: number;
				available_markets: string[];
				external_urls: {
					spotify: string;
				};
				href: string;
				id: string;
				images: [
					{
						height: number;
						url: string;
						width: number;
					},
				];
				name: string;
				release_date: string;
			};
			artists: [
				{
					external_urls: {
						spotify: string;
					};
					followers: {
						total: number;
					};
					genres: string[];
					id: string;
					images: [
						{
							height: number;
							url: string;
							width: number;
						},
					];
					name: string;
					popularity: number;
				},
			];
			available_markets: string[];
			duration_ms: number;
			explicit: boolean;
			href: string;
			id: string;
			name: string;
			popularity: number;
			preview_url: string;
		},
	];
}

export async function GET(request: NextRequest) {
	const params = request.nextUrl.searchParams;
	//checking user input
	let userInputOK: any = checkUserInputTopItems(params);
	if (userInputOK.limit == undefined || userInputOK.time == undefined) {
		return userInputOK;
	}
	let { limit, time }: any = userInputOK;

	//checking authorization
	const authorization = request.headers.get("authorization") as string;
	let authOK = checkAuth(authorization);
	if (authOK != null) {
		return authOK;
	}
	//fetching data from spotify
	let spotifyRes = await fetch(
		`https://api.spotify.com/v1/me/top/tracks?time_range=${time}&limit=${limit}`,
		{
			headers: {
				Authorization: authorization,
			},
			cache: "no-cache",
		},
	);
	//check response
	let spotifyResOK = checkSpotifyRespose(spotifyRes);
	if (spotifyResOK != null) {
		return spotifyResOK;
	}
	//parse response
	let parsed: parsedResponse = await spotifyRes.json();

	//construct response
	let res: any = {
		total: parsed.total,
		items: parsed.items.map((item) => {
			return {
				id: item.id,
				name: item.name,
				artists: item.artists.map((artist) => {
					return {
						id: artist.id,
						name: artist.name,
					};
				}),
				previewUrl: item.preview_url,
				imageUrl: item.album.images[0].url,
			};
		}),
	};

	return NextResponse.json(res, { status: 200 });
}
