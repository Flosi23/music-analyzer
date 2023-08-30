//all scopes of spotify
const scopes = [
	"user-read-private",
	"user-read-email",
	"user-read-recently-played",
	"user-top-read",
	"user-read-playback-state",
	"user-modify-playback-state",
	"user-read-currently-playing",
	"streaming",
	"app-remote-control",
	"playlist-modify-public",
	"playlist-modify-private",
	"playlist-read-private",
	"playlist-read-collaborative",
	"user-follow-modify",
	"user-follow-read",
	"user-library-modify",
	"user-library-read",
	"user-read-playback-position",
	"user-read-playback-state",
	"user-read-currently-playing",
	"user-modify-playback-state",
	"user-read-recently-played",
	"user-top-read",
	"ugc-image-upload",
].join(",");

const params = {
	scope: scopes,
};

const queryParamString = new URLSearchParams(params);

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

export const refreshAccessToken = async (token) => {
	try {
		let res = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			body: new URLSearchParams({
				grant_type: "refresh_token",
				refresh_token: token.refreshToken,
			}),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${Buffer.from(
					`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
				).toString("base64")}`,
			},
			cache: "no-cache",
		});
		res = await res.json();
		return {
			...token,
			accessToken: res.access_token,
			refreshToken: res.refresh_token
				? res.refresh_token
				: token.refreshToken,
			accessTokenExpires: Date.now() + res.expires_in * 1000,
		};
	} catch (err) {
		return {
			...token,
			err: "Error refreshing token",
		};
	}
};
