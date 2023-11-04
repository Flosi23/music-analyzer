import { SavedTrackObject, TracksApi } from "@lib/spotify/generated";

export default class ExtendedTracksApi extends TracksApi {
	public async getUsersSavedTracksAll(
		maxCount?: number,
	): Promise<SavedTrackObject[]> {
		let currentOffset = 0;
		const max = maxCount || Number.MAX_VALUE;
		const limit = Math.min(max, 50);
		let next = false;
		const tracks: SavedTrackObject[] = [];

		do {
			const savedTracksRes = await this.getUsersSavedTracks(
				undefined,
				limit,
				currentOffset,
			);
			tracks.push(...savedTracksRes.data.items);

			currentOffset += limit;
			next = savedTracksRes.data.next !== null;
		} while (next && currentOffset < max);

		return tracks;
	}
}
