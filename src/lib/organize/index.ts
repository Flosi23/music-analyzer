import {AudioFeature, FilterableSong, FilterOptions, GenreMatchingType,} from "@lib/organize/types";
import {matchSomeString} from "@lib/helper";
import {Genre, genres} from "@lib/organize/genres/genre";

/**
 * FilterSongs applies the provided filters on the array of songs and returns the result
 */
export default function filterSongs<T extends FilterableSong>(
	songs: T[],
	options: FilterOptions,
): T[] {
	let result: T[] = songs;

	if (options.genres && options.genres.values.length > 0) {
		if (options.genres.matchingType === GenreMatchingType.MATCH_ALL)
			result = result.filter((s) =>
				s.genres.every((s) =>
					matchSomeString(options.genres?.values, s),
				),
			);
		if (options.genres.matchingType === GenreMatchingType.MATCH_ONE) {
			result = result.filter((s) =>
				s.genres.some((s) =>
					matchSomeString(options.genres?.values, s),
				),
			);
		}
	}

	for (let key in options.audioFeatures) {
		let audioFeatureFilterKey = key as AudioFeature;
		const audioFeatureFilter = options.audioFeatures[audioFeatureFilterKey];
		if (!audioFeatureFilter) continue;

		result = result.filter((s) => {
			const songValue = s.audioFeatures[audioFeatureFilterKey];
			if (songValue !== undefined) {
				return (
					songValue >= audioFeatureFilter.from &&
					songValue <= audioFeatureFilter.to
				);
			}
			// if the song doesn't have the audio feature we will remove it from the selection
			return false;
		});
	}

	return result;
}

export function filterAndGroupSongs<T extends FilterableSong>(
	songs: T[],
	options: FilterOptions,
): Map<Genre | "other", T[]> {
	const filteredSongs = filterSongs<T>(songs, options);
	const map: Map<Genre | "other", T[]> = new Map();

	let nonGroupedSongs = filteredSongs;

	for (let i = 0; i < genres.length; i++) {
		const genre: Genre = genres[i];
		const matchingSongs = filteredSongs.filter((s) =>
			matchSomeString(s.genres, genre),
		);
		nonGroupedSongs = nonGroupedSongs.filter(
			(s: T) => !matchSomeString(s.genres, genre),
		);
		if (matchingSongs.length > 0) {
			map.set(genre, matchingSongs);
		}
	}

	if (nonGroupedSongs.length > 0) {
		map.set("other", nonGroupedSongs);
	}

	return map;
}
