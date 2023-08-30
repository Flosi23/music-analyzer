import { NextRequest, NextResponse } from "next/server";
import { checkAuth, checkSpotifyRespose } from "@lib/spotify/apiChecks";

interface parsedResponse {
	album: {
		name: string;
		images: [
			{
				url: string;
				width: number;
				height: number;
			},
		];
		release_date: string;
		release_date_precision: string;
	};
	artists: [
		{
			name: string;
			id: string;
			images: [
				{
					url: string;
					width: number;
					height: number;
				},
			];
		},
	];
	external_urls: {
		spotify: string;
	};
	popularity: number;
	name: string;
	preview_url: string | null;
	genres: string[];
}

interface parsedResponseArtist {
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

interface parsedResponseAudioFeatures {
	acousticness: number;
	danceability: number;
	energy: number;
	instrumentalness: number;
	liveness: number;
	loudness: number;
	speechiness: number;
	valence: number;
	duration_ms: number;
	tempo: number;
}

interface parsedResponseAudioAnalysis {
	track: {
		key: number;
		mode: number;
	};
}

export async function GET(
	request: NextRequest,
	params: { params: { id: string } },
) {
	//check authorization
	const id = params.params.id;
	const authorization = request.headers.get("authorization") as string;
	let authOK = checkAuth(authorization);
	if (authOK != null) {
		return authOK;
	}
	//check if id is provided
	if (!id) {
		return NextResponse.json(
			{ err: "No song id provided" },
			{ status: 400 },
		);
	}
	//fetch data from spotify
	let spotifyRes = await fetch(
		`https://api.spotify.com/v1/tracks/${id}?market=US`,
		{
			headers: {
				Authorization: authorization,
			},
		},
	);
	//check if data was fetched
	let spotifyResOK = checkSpotifyRespose(spotifyRes);
	if (spotifyResOK != null) {
		return spotifyResOK;
	}
	//parse response
	let parsed: parsedResponse = await spotifyRes.json();
	//construct response
	let res: any = {
		album: {
			name: parsed.album.name,
			images: parsed.album.images.map((image) => {
				return image.url;
			}),
		},
		artists: parsed.artists.map((artist) => {
			return {
				name: artist.name,
				id: artist.id,
				images: [],
			};
		}),
		externalUrl: parsed.external_urls.spotify,
		popularity: parsed.popularity,
		name: parsed.name,
		previewUrl: parsed.preview_url,
		releaseDate: parsed.album.release_date,
		releaseDatePrecision: parsed.album.release_date_precision,
		genres: [],
	};

	//fetch artist images and genres
	for (let i = 0; i < parsed.artists.length; i++) {
		let artist = parsed.artists[i];
		//fetch artist data
		let artistRes = await fetch(
			`https://api.spotify.com/v1/artists/${artist.id}`,
			{
				headers: {
					Authorization: authorization,
				},
			},
		);
		//check if data was fetched
		let artistResOK = checkSpotifyRespose(artistRes);
		if (artistResOK != null) {
			return artistResOK;
		}
		//add images to responses
		let artistParsed: parsedResponseArtist = await artistRes.json();
		res.artists[i].images = artistParsed.images.map((image: any) => {
			return image.url;
		});
		//add genres to response
		res.genres = artistParsed.genres;
	}

	// add audio features
	const audioFeaturesRes = await fetch(
		`https://api.spotify.com/v1/audio-features/${id}`,
		{
			headers: {
				Authorization: authorization,
			},
		},
	);
	//check if data was fetched
	const audioFeaturesResOK = checkSpotifyRespose(audioFeaturesRes);
	if (audioFeaturesResOK != null) {
		return audioFeaturesResOK;
	}
	//parse response
	const audioFeaturesParsed: parsedResponseAudioFeatures =
		await audioFeaturesRes.json();
	//add audio features to response
	res.acousticness = audioFeaturesParsed.acousticness;
	res.danceability = audioFeaturesParsed.danceability;
	res.energy = audioFeaturesParsed.energy;
	res.instrumentalness = audioFeaturesParsed.instrumentalness;
	res.liveness = audioFeaturesParsed.liveness;
	res.loudness = audioFeaturesParsed.loudness;
	res.speechiness = audioFeaturesParsed.speechiness;
	res.valence = audioFeaturesParsed.valence;
	res.durationMs = audioFeaturesParsed.duration_ms;
	res.bpm = audioFeaturesParsed.tempo;

	// get key and mode with api call to spotify/analysis
	const audioAnalysisRes = await fetch(
		`https://api.spotify.com/v1/audio-analysis/${id}`,
		{
			headers: {
				Authorization: authorization,
			},
		},
	);
	//check if data was fetched
	const audioAnalysisResOK = checkSpotifyRespose(audioAnalysisRes);
	if (audioAnalysisResOK != null) {
		return audioAnalysisResOK;
	}
	//parse response
	const audioAnalysisParsed: parsedResponseAudioAnalysis =
		await audioAnalysisRes.json();
	//add audio features to response
	const keyMap: { [key: number]: String } = {
		0: "C",
		1: "C♯, D♭",
		2: "D",
		3: "D♯, E♭",
		4: "E",
		5: "F",
		6: "F♯, G♭",
		7: "G",
		8: "G♯, A♭",
		9: "A",
		10: "A♯, B♭",
		11: "B",
	};

	res.key = keyMap[audioAnalysisParsed.track.key];
	res.mode = audioAnalysisParsed.track.mode == 0 ? "Minor" : "Major";

	return NextResponse.json(res, { status: 200 });
}
