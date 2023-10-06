export interface SpotifyRefreshAccessTokenResponse {
	access_token: string;
	token_type: string;
	scope: string;
	expires_in: number;
}

export interface SpotifyErrorResponse {
	error: string;
	error_description: string;
}
