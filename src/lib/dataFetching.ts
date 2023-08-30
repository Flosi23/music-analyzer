import { Session } from "next-auth";
import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

export function fetchDataFromApi(
	session: SpotifySession,
	url: string,
	setData: React.Dispatch<any>,
	setLoading: React.Dispatch<any>,
) {
	if (!session) return;
	setLoading(true);
	fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			return null;
		})
		.then((data) => {
			console.log(data);
			setLoading(false);
			setData(data);
		});
}

type ArtistListType = {
	name: string;
};

export type TopSongType = {
	name: string;
	artists: Array<ArtistListType>;
	imageUrl: string;
	id: string;
};

export type TopArtistType = {
	name: string;
	imageUrl: string;
	id: string;
};

export type TopItemType = TopArtistType | TopSongType;

export type TopItemsResponse = {
	items: [TopItemType];
};

export type MeType = {
	displayName: string;
	images: [string];
};

export type SpotifySession = {
	user: {
		accessToken: string;
	};
};

export type NowPlayingType = {
	name: string;
	artists: [ArtistListType];
	isPlaying: boolean;
	id: string;
};

export function useSpotifyApi<T = any>(
	url: string,
): [T | null, SpotifySession, boolean] {
	const { data: session }: { data: Session | null } = useSession();
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	// fetch data from api depending on category
	useEffect(() => {
		fetchDataFromApi(
			session as unknown as SpotifySession,
			url,
			setData,
			setLoading,
		);
		console.log("new fetch from api doing..,");
	}, [session, url]);

	return [data, session as unknown as SpotifySession, loading];
}
