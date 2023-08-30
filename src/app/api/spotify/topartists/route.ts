import { NextRequest, NextResponse } from "next/server";
import {
	checkAuth,
	checkSpotifyRespose,
	checkUserInputTopItems,
} from "@lib/spotify/apiChecks";

interface parsedResponse {
	items: [
		{
			external_urls: {
				spotify: string;
			};
			followers: {
				total: number;
			};
			genres: string[];
			images: [
				{
					url: string;
					width: number;
					height: number;
				},
			];
			name: string;
			popularity: number;
			type: string;
			uri: string;
			id: string;
		},
	];
	total: number;
	limit: number;
	offset: number;
	href: string;
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
		`https://api.spotify.com/v1/me/top/artists?time_range=${time}&limit=${limit}`,
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

	// TODO: type definition
	let res: any = {
		items: parsed.items.map((item) => {
			return {
				imageUrl: item.images[0].url,
				name: item.name,
				popularity: item.popularity,
				imageUrls: item.images.map((image) => image.url),
				id: item.id,
			};
		}),
		total: parsed.total, //the amount the spotify api can return. Only important if limit > total
	};

	//return response
	return NextResponse.json(res, { status: 200 });
}
