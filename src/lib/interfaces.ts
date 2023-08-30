export interface SongData {
	name: string;
	album: {
		name: string;
		images: string[];
	};
	popularity: number;
	danceability: number;
	energy: number;
	loudness: number;
	speechiness: number;
	acousticness: number;
	instrumentalness: number;
	liveness: number;
	valence: number;
	releaseDate: string;
	releaseDatePrecision: string;
	mode: string;
	key: string;
	durationMs: number;
	bpm: number;
	genres: string[];
	previewUrl: string | null;
	artists: [
		{
			name: string;
			id: string;
			images: string[];
		},
	];
}

export interface ArtistData {
	externalUrl: string;
	followersCount: number;
	genres: [string];
	images: [string];
	name: string;
	popularity: number;
	topSongs: ArtistTopSong[];
	relatedArtists: [
		{
			id: string;
			name: string;
			image: string; // null if not available
		},
	];
}

export type ArtistTopSong = {
	id: string;
	name: string;
	image: string;
};
