export interface FilterableSong {
	genres: string[];
	audioFeatures: Partial<Record<AudioFeature, number>>;
}

/**
 * Songs can be filtered by genres. The genre filter uses the following structure
 * ```
 * {
 *      values: string[],
 *      matchingType: GenreMatchingType
 * }
 * ```
 * where `values` are the genres and the matchingType decides how the songs will be matched to the genres.
 * When using `MATCH_ALL` a song must contain all given genres to be matched. When using `MATCH_ONE` a song must contain
 * at least one of the given genres to be matched.
 *
 * In addition to genres the tracks musical attributes can be used as a filter as well. For every attribute the filter has the
 * following structure:
 * ```
 * {
 *      from: number,
 *      to: number,
 * }
 * ```
 * where `from` and 'to' define the range that the value should be in
 * (e.g. if `from = 0.8` and `to = 1` a value of `0.9` would match)
 *
 * The attributes that can be filtered by are the following:
 * - **`acousticness`**: A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.
 * - **`danceability`**: Danceability describes how suitable a track is for dancing. A value of 0.0 is least danceable and 1.0 is most danceable.
 * - **`energy`**: Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy.
 * - **`instrumentalness`**: Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.
 * - **`liveness`**: Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.
 * - **`speechiness`**: Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.
 * - **`tempo`**: The overall estimated tempo of a track in beats per minute (BPM).
 * - **`valence`**: A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
 */
export type FilterOptions = GenreFilterOptions & {
	audioFeatures: AudioFeaturesFilterOptions;
};

export enum GenreMatchingType {
	MATCH_ALL,
	MATCH_ONE,
}

interface GenreFilterOptions {
	genres?: {
		values: string[];
		matchingType: GenreMatchingType;
	};
}

type AudioFeaturesFilterOptions = Partial<
	Record<AudioFeature, AudioFeaturesFilter>
>;

export type AudioFeature =
	| "acousticness"
	| "danceability"
	| "energy"
	| "instrumentalness"
	| "liveness"
	| "loudness"
	| "speechiness"
	| "tempo"
	| "valence";

interface AudioFeaturesFilter {
	from: number;
	to: number;
}
