import { NextRequest, NextResponse } from "next/server";

import { checkAuth, checkSpotifyRespose } from "@lib/spotify/apiChecks";

interface parsedResponse {
	item: {
		artists: [
			{
				name: string;
			},
		];
		name: string;
		id: string;
	};
	is_playing: boolean;
}

export async function GET(req: NextRequest) {
	//check authorization
	const authorization = req.headers.get("authorization") as string;
	let authOK = checkAuth(authorization);
	if (authOK != null) {
		return authOK;
	}
	//fetch data from spotify
	let spotifyRes = await fetch(
		`https://api.spotify.com/v1/me/player/currently-playing`,
		{
			headers: {
				Authorization: authorization,
			},
		},
	);
	console.log("data fetched", spotifyRes.statusText);
	//check if data was fetched
	let spotifyResOK = checkSpotifyRespose(spotifyRes);
	if (spotifyResOK != null) {
		return spotifyResOK;
	}
	console.log("data ok");
	//user is not playing so spotify sometimes returns 204
	if (spotifyRes.status === 204) {
		return NextResponse.json(
			{
				isPlaying: false,
				name: null,
				artists: null,
				id: null,
			},
			{ status: 200 },
		);
	}
	//parse data
	let parsed: parsedResponse = await spotifyRes.json();
	console.log("data parsed");

	if (!parsed.is_playing) {
		return NextResponse.json(
			{
				isPlaying: false,
				name: null,
				artists: null,
				id: null,
			},
			{ status: 200 },
		);
	}
	console.log("data constructed");

	const res: any = {
		isPlaying: parsed.is_playing,
		name: parsed.item.name,
		artists: parsed.item.artists,
		id: parsed.item.id,
	};

	console.log(res);
	//return response
	return NextResponse.json(res, { status: 200 });
}
