import { AudioFeaturesObject, TrackObject } from "@lib/spotify/generated";

export interface DetailedTrackObject extends TrackObject {
	audioFeatures?: AudioFeaturesObject;
	genres?: string[];
}
