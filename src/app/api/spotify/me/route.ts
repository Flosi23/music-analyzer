import { NextResponse } from "next/server";
import { checkAuth, checkSpotifyRespose } from "@lib/spotify/apiChecks";

interface parsedResponse {
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

export async function GET(request: Request) {
	const authorization = request.headers.get("authorization") as string;
	const authOK = checkAuth(authorization);
	if (authOK != null) {
		return authOK;
	}
	const spotifyRes = await fetch("https://api.spotify.com/v1/me", {
		headers: {
			Authorization: authorization,
		},
	});
	let spotifyResOK = checkSpotifyRespose(spotifyRes);
	if (spotifyResOK != null) {
		return spotifyResOK;
	}
	const parsed = await spotifyRes.json();

	let res: any = {
		displayName: parsed.display_name,
		email: parsed.email,
		externalUrl: parsed.external_urls.spotify,
		followersCount: parsed.followers.total,
		id: parsed.id,
		images: parsed.images.map((image: any) => {
			return image.url;
		}),
	};

	return NextResponse.json(res, { status: 200 });
}
