import { NextResponse } from "next/server";

/**
 * Checks if the authorization header is valid
 * @param {string} authorization The authorization header
 * @returns {NextResponse}  Returns a NextResponse if the authorization header is invalid
 * @returns {null} Returns null if the authorization header is valid
 */
export const checkAuth = (authorization: String) => {
	if (!authorization) {
		return NextResponse.json(
			{ err: "No authorization header" },
			{ status: 401 },
		);
	}
	if (!authorization.startsWith("Bearer ")) {
		return NextResponse.json(
			{ err: "Invalid authorization header" },
			{ status: 401 },
		);
	}
	return null; //everything is ok
};

/**
 * Checks if the response from the spotify api is valid
 * @param {Response} spotifyRes The response from the spotify api
 * @returns {NextResponse}  Returns a NextResponse that can be sent back if the response from the spotify api is invalid
 * @returns {null} Returns null if the response from the spotify api is valid
 *
 * */
export const checkSpotifyRespose = (spotifyRes: Response) => {
	console.log(spotifyRes.status, spotifyRes.statusText);
	if (!spotifyRes.ok && spotifyRes.status != 204) {
		//204 means no content and return sometimes when player of user is not active
		if (spotifyRes.status === 401) {
			return NextResponse.json(
				{ err: "Invalid access token" },
				{ status: 401 },
			);
		}
		if (spotifyRes.status === 404) {
			return NextResponse.json({ err: "Not found" }, { status: 404 });
		}
		if (spotifyRes.status === 429) {
			return NextResponse.json(
				{ err: "Too many requests" },
				{ status: 429 },
			);
		}
		if (spotifyRes.status === 400) {
			return NextResponse.json({ err: "Bad request" }, { status: 400 });
		}
		return NextResponse.json(
			{ err: "Error from Spotify API" },
			{ status: 400 },
		);
	}
	return null; //everything is ok
};

/**
 * Checks if the user input for both top items endpoint is valid
 * @param {URLSearchParams} params The url search params
 * @returns {NextResponse}  Returns a NextResponse that can be sent back if the user input is invalid
 * @returns {{limit: string, time_range: string}} Returns the limit and time_range if the user input is valid
 */
export const checkUserInputTopItems = (params: URLSearchParams) => {
	let limit = params.get("limit");
	let time_range = params.get("time");
	if (!limit) {
		return NextResponse.json({ err: "No limit provided" }, { status: 400 });
	}
	if (!time_range) {
		return NextResponse.json(
			{ err: "No time_range provided" },
			{ status: 400 },
		);
	}
	if (!["short_term", "medium_term", "long_term"].includes(time_range)) {
		return NextResponse.json(
			{ err: "Invalid time_range" },
			{ status: 400 },
		);
	}
	if (isNaN(parseInt(limit))) {
		return NextResponse.json({ err: "Invalid limit" }, { status: 400 });
	}
	if (parseInt(limit) < 1 || parseInt(limit) > 50) {
		return NextResponse.json({ err: "Invalid limit" }, { status: 400 });
	}
	return { limit: limit, time: time_range }; //everything is ok
};
