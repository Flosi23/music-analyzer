import { NextRequest, NextResponse } from "next/server";
import { checkAuth, checkSpotifyRespose } from "@lib/spotify/apiChecks";

interface parsedResponse {
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
}

interface parsedResponseTopTracks {
	tracks: [
		{
			id: string;
			name: string;
			album: {
				images: [
					{
						url: string;
						width: number;
						height: number;
					},
				];
			};
		},
	];
}

interface parsedResponseRelatedArtists {
	artists: [
		{
			id: string;
			name: string;
			images: [
				{
					url: string;
					width: number;
					height: number;
				},
			];
		},
	];
}

export async function GET(
	request: NextRequest,
	params: { params: { id: string } },
) {
	const id = params.params.id;
	const authorization = request.headers.get("authorization") as string;
	//check auth
	let authOK = checkAuth(authorization);
	if (authOK != null) {
		return authOK;
	}
	if (!id) {
		return NextResponse.json(
			{ err: "No artist id provided" },
			{ status: 400 },
		);
	}
	let spotifyRes = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
		headers: {
			Authorization: authorization,
		},
	});
	//check spotify response
	let spotifyResOK = checkSpotifyRespose(spotifyRes);
	if (spotifyResOK != null) {
		return spotifyResOK;
	}

	let parsed: parsedResponse = await spotifyRes.json();

	let res: any = {
		externalUrl: parsed.external_urls.spotify,
		followersCount: parsed.followers.total,
		genres: parsed.genres,
		name: parsed.name,
		popularity: parsed.popularity,
		images: parsed.images.map((image) => {
			return image.url;
		}),
	};
	//get top 3 tracks
	spotifyRes = await fetch(
		`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`,
		{
			headers: {
				Authorization: authorization,
			},
		},
	);
	//check spotify response
	spotifyResOK = checkSpotifyRespose(spotifyRes);
	if (spotifyResOK != null) {
		return spotifyResOK;
	}
	let parsedTopTracks: parsedResponseTopTracks = await spotifyRes.json();

	res.topSongs = parsedTopTracks.tracks.map((track) => {
		return {
			id: track.id,
			name: track.name,
			image: track.album.images[0].url,
		};
	});
	//get top 3 related artists
	spotifyRes = await fetch(
		`https://api.spotify.com/v1/artists/${id}/related-artists`,
		{
			headers: {
				Authorization: authorization,
			},
		},
	);
	//check spotify response
	spotifyResOK = checkSpotifyRespose(spotifyRes);
	if (spotifyResOK != null) {
		return spotifyResOK;
	}
	let parsedRelatedArtists: parsedResponseRelatedArtists =
		await spotifyRes.json();
	res.relatedArtists = parsedRelatedArtists.artists.map((artist) => {
		return {
			id: artist.id,
			name: artist.name,
			image: artist.images[0].url,
		};
	});
	console.log(res);
	return NextResponse.json(res, { status: 200 });
}
