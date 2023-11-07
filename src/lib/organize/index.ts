import {AudioFeature, FilterableSong, FilterOptions, GenreMatchingType,} from "@lib/organize/types";

/**
 * FilterSongs applies the provided filters on the array of songs and returns the result
 */
export default function filterSongs<T extends FilterableSong>(
	songs: T[],
	options: FilterOptions,
): T[] {
	let result: T[] = [];

	if (options.genres) {
		if (options.genres.matchingType === GenreMatchingType.MATCH_ALL)
			result = songs.filter((s) =>
				s.genres.every((s) => options.genres?.values.includes(s)),
			);
		if (options.genres.matchingType === GenreMatchingType.MATCH_ONE) {
			result = songs.filter((s) =>
				s.genres.some((s) => options.genres?.values.includes(s)),
			);
		}
	}

	for (let key in options.audioFeatures) {
		let audioFeatureFilterKey = key as AudioFeature;
		const audioFeatureFilter = options.audioFeatures[audioFeatureFilterKey];
		if (!audioFeatureFilter) continue;

		result = songs.filter((s) => {
			const songValue = s.audioFeatures[audioFeatureFilterKey];
			if (songValue) {
				return (
					songValue >= audioFeatureFilter.from &&
					songValue <= audioFeatureFilter.to
				);
			}
			// if the song doesn't have the audio feature we will automatically remove it
			return false;
		});
	}

	return result;
}
