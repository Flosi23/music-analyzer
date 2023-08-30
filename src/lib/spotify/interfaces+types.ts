export type nowPlayingParsed = {
	isPlaying: boolean;
	name: string;
	artists: string[];
	id: string;
} | null;

export type topItemsParsed = {
	total: number;
	items:
		| [
				{
					//songs
					name: string;
					artists: [{ name: string; id: string }];
					id: string;
					image: string;
				},
		  ]
		| [
				// artist
				{
					name: string;
					id: string;
					imageUrls: string[];
				},
		  ];
} | null;
