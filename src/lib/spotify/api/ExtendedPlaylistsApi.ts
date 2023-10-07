import {
	PlaylistsApi,
	PlaylistTrackObject,
	SimplifiedPlaylistObject,
} from "@lib/spotify/generated";

export default class ExtendedPlaylistsApi extends PlaylistsApi {
	public async getUsersPlaylistsTracks(
		playlistIds: string[],
	): Promise<PlaylistTrackObject[]> {
		const tracks: PlaylistTrackObject[] = [];

		for (const id of playlistIds) {
			console.log("id", id);
			const playlistItems = await this.getPlaylistsTracksAll(id);
			tracks.push(...playlistItems);
		}

		return tracks;
	}

	public async getUsersPlaylistsTracksAll(): Promise<PlaylistTrackObject[]> {
		const playlists = await this.getUsersPlaylistsAll();
		const playlistIds = playlists
			.map((p) => p.id)
			.filter((p): p is string => p !== undefined);

		return await this.getUsersPlaylistsTracks(playlistIds);
	}

	public async getUsersPlaylistsAll(): Promise<SimplifiedPlaylistObject[]> {
		let currentOffset = 0;
		let next = false;
		const playlists: SimplifiedPlaylistObject[] = [];

		do {
			const getPlaylistRes = await this.getAListOfCurrentUsersPlaylists(
				50,
				currentOffset,
			);
			playlists.push(...getPlaylistRes.data.items);

			currentOffset += 50;
			next = getPlaylistRes.data.next !== null;
		} while (next);

		return playlists;
	}

	public async getPlaylistsTracksAll(
		playlistId: string,
	): Promise<PlaylistTrackObject[]> {
		let currentOffset = 0;
		let next = false;
		const tracks: PlaylistTrackObject[] = [];

		do {
			const getPlaylistTracksRes = await this.getPlaylistsTracks(
				playlistId,
				undefined,
				undefined,
				50,
				currentOffset,
			);
			tracks.push(...getPlaylistTracksRes.data.items);

			currentOffset += 50;
			next = getPlaylistTracksRes.data.next !== null;
		} while (next);

		return tracks;
	}
}
