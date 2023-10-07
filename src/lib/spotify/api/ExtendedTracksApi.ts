import { SavedTrackObject, TracksApi } from "@lib/spotify/generated";

export default class ExtendedTracksApi extends TracksApi {
	public async getUsersSavedTracksAll(): Promise<SavedTrackObject[]> {
		let currentOffset = 0;
		let next = false;
		const tracks: SavedTrackObject[] = [];

		do {
			const savedTracksRes = await this.getUsersSavedTracks(
				undefined,
				50,
				currentOffset,
			);
			tracks.push(...savedTracksRes.data.items);

			currentOffset += 50;
			next = savedTracksRes.data.next !== null;
		} while (next);

		return tracks;
	}
}
