import {
	AlbumsApi,
	ArtistsApi,
	AudiobooksApi,
	CategoriesApi,
	ChaptersApi,
	Configuration,
	EpisodesApi,
	MarketsApi,
	PlayerApi,
	SearchApi,
	ShowsApi,
	UsersApi,
} from "@lib/spotify/generated";
import axios, { AxiosError } from "axios";
import axiosRetry from "axios-retry";
import { Account } from "@prisma/client";
import { BASE_PATH } from "@lib/spotify/generated/base";
import * as process from "process";
import {
	SpotifyErrorResponse,
	SpotifyRefreshAccessTokenResponse,
} from "@lib/spotify/types";
import prisma from "@lib/prisma";
import ExtendedTracksApi from "@lib/spotify/api/ExtendedTracksApi";
import ExtendedPlaylistsApi from "@lib/spotify/api/ExtendedPlaylistsApi";

export default class SpotifyClient {
	albums: AlbumsApi;
	artists: ArtistsApi;
	audiobooks: AudiobooksApi;
	categories: CategoriesApi;
	chapters: ChaptersApi;
	episodes: EpisodesApi;
	markets: MarketsApi;
	player: PlayerApi;
	playlists: ExtendedPlaylistsApi;
	search: SearchApi;
	shows: ShowsApi;
	tracks: ExtendedTracksApi;
	users: UsersApi;

	constructor(account: Account) {
		const config = new Configuration();
		const axiosInstance = axios.create();

		axiosRetry(axiosInstance, {
			retries: 2,
			retryDelay: () => 5000,
			retryCondition: (error) => {
				return error.response?.status === 429;
			},
			onRetry: () => {
				console.log("retrying request because of spotify rate limit");
			},
		});

		axiosInstance.interceptors.request.use(async (config) => {
			if (
				account.expires_at &&
				account.expires_at * 1000 <= new Date().getTime()
			) {
				account = await this.refreshAccessToken(account);
			}

			config.headers.Authorization = `${account.token_type} ${account.access_token}`;
			return config;
		});

		axiosInstance.interceptors.response.use(
			(res) => res,
			async (error: AxiosError<SpotifyErrorResponse>) => {
				throw new Error(
					error.response?.data?.error_description || error.message,
				);
			},
		);

		this.albums = new AlbumsApi(config, BASE_PATH, axiosInstance);
		this.artists = new ArtistsApi(config, BASE_PATH, axiosInstance);
		this.audiobooks = new AudiobooksApi(config, BASE_PATH, axiosInstance);
		this.categories = new CategoriesApi(config, BASE_PATH, axiosInstance);
		this.chapters = new ChaptersApi(config, BASE_PATH, axiosInstance);
		this.episodes = new EpisodesApi(config, BASE_PATH, axiosInstance);
		this.markets = new MarketsApi(config, BASE_PATH, axiosInstance);
		this.player = new PlayerApi(config, BASE_PATH, axiosInstance);
		this.playlists = new ExtendedPlaylistsApi(
			config,
			BASE_PATH,
			axiosInstance,
		);
		this.search = new SearchApi(config, BASE_PATH, axiosInstance);
		this.shows = new ShowsApi(config, BASE_PATH, axiosInstance);
		this.tracks = new ExtendedTracksApi(config, BASE_PATH, axiosInstance);
		this.users = new UsersApi(config, BASE_PATH, axiosInstance);
	}

	private async refreshAccessToken(account: Account): Promise<Account> {
		if (account.refresh_token == null) {
			throw new Error("refresh_token of spotify account is null");
		}

		const res = await axios.post<SpotifyRefreshAccessTokenResponse>(
			"https://accounts.spotify.com/api/token",
			new URLSearchParams({
				grant_type: "refresh_token",
				refresh_token: account.refresh_token,
			}),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: `Basic ${this.encodeBase64(
						`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
					)}`,
				},
			},
		);

		if (res.status != 200) {
			throw new Error(
				`spotify refresh access_token request unsuccessful: ${res.statusText}`,
			);
		}

		const data = res.data;

		console.log("updating access token and refresh token");

		return prisma.account.update({
			where: {
				id: account.id,
			},
			data: {
				access_token: data.access_token,
				token_type: data.token_type,
				expires_at:
					(new Date().getTime() + data.expires_in * 1000) / 1000,
			},
		});
	}

	private encodeBase64(string: string): string {
		return Buffer.from(string).toString("base64");
	}
}
