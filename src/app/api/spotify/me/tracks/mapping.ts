import {
	ArtistObject,
	AudioFeaturesObject,
	PlaylistTrackObject,
	SavedTrackObject,
	TrackObject,
} from "@lib/spotify/generated";
import { DetailedTrackObject } from "@app/api/spotify/me/tracks/types";

export function mapSavedTracksToTracks(
	savedTracks: SavedTrackObject[],
): TrackObject[] {
	return savedTracks
		.map((savedTrack) => savedTrack.track)
		.filter(
			(savedTrack): savedTrack is TrackObject => savedTrack !== undefined,
		);
}

export function mapPlaylistsTracksToTracks(
	playlistTracks: PlaylistTrackObject[],
): TrackObject[] {
	return playlistTracks
		.map((playlistTrack) => playlistTrack.track)
		.filter(
			(playlistTrack): playlistTrack is TrackObject =>
				playlistTrack !== undefined && playlistTrack.type === "track",
		);
}

export function constructDetailedTrackObjects(
	tracks: TrackObject[],
	artists: ArtistObject[],
	audioFeatures: AudioFeaturesObject[],
): DetailedTrackObject[] {
	return tracks.map((track) => {
		const audioFeature = audioFeatures.find(
			(audioFeature) => audioFeature.id === track.id,
		);
		const trackArtists = artists.filter(
			(artist) =>
				track.artists?.find(
					(trackArtist) => trackArtist.id === artist.id,
				),
		);
		const genres =
			trackArtists && trackArtists.length > 0
				? trackArtists[0].genres || []
				: [];

		track.artists = trackArtists;

		return {
			audioFeatures: audioFeature || {},
			genres: genres,
			...track,
		};
	});
}
