//all scopes of spotify_old
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

const queryParamString = new URLSearchParams({
	scope: scopes,
});

export const SPOTIFY_LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;
