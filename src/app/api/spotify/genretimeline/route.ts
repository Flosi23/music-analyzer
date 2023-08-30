// endpoint to get a users top gernes from database for each day in the database and return it as a json
import { checkAuth, checkSpotifyRespose } from "@lib/spotify/apiChecks";
import { NextRequest } from "next/server";

interface parsedResponseMe {
	display_name: string;
	email: string;
	external_urls: {
		spotify: string;
	};
	followers: {
		total: number;
	};
	id: string;
	images: [
		{
			url: string;
			width: number;
			height: number;
		},
	];
}

export async function GET(request: NextRequest) {
	//check authorization
	const authorization = request.headers.get("authorization") as string;
	let authOK = checkAuth(authorization);
	if (authOK != null) {
		return authOK;
	}
	console.log("(/)authOK");
	//fetch id from spotify
	let spotifyRes = await fetch(`https://api.spotify.com/v1/me`, {
		headers: {
			Authorization: authorization,
		},
		method: "GET",
	});
	//check if data was fetched
	let spotifyResOK = checkSpotifyRespose(spotifyRes);
	if (spotifyResOK != null) {
		return spotifyResOK;
	}
	console.log("(/)spotifyResOK");
	//get id from data
	let data: parsedResponseMe = await spotifyRes.json();

	console.log("(/)res generated");
	//return data
	return new Response(JSON.stringify("{not: 'planned'}"), { status: 200 });
}
