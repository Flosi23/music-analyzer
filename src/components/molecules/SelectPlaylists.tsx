import { useEffect, useState } from "react";
import TextBody from "@components/text/TextBody";
import TextLabel from "@components/text/TextLabel";
import Chip from "@components/atoms/Chip";

export interface SelectPlaylistPlaylist {
	id?: string;
	name?: string;
	image?: string;
	owner?: string;
	public?: boolean;
}

export enum SelectPlaylistFilter {
	ALL,
	NONE,
}

interface Props {
	playlists?: SelectPlaylistPlaylist[];
	playlistFilter?: SelectPlaylistFilter;
	defaultSelection?: SelectPlaylistPlaylist[];
	onSelectionChanged: (selectedPlaylists: SelectPlaylistPlaylist[]) => void;
}

export default function SelectPlaylists({
	playlists = [],
	playlistFilter,
	defaultSelection = [],
	onSelectionChanged,
}: Props) {
	const [selectedPlaylists, setSelectedPlaylists] =
		useState<SelectPlaylistPlaylist[]>(defaultSelection);

	const updateSelectedPlaylists = (playlists: SelectPlaylistPlaylist[]) => {
		setSelectedPlaylists(playlists);
		onSelectionChanged(playlists);
	};

	useEffect(() => {
		if (playlistFilter === undefined) return;
		updateSelectedPlaylists(filterPlaylists());
	}, [playlistFilter]);

	const filterPlaylists = (): SelectPlaylistPlaylist[] => {
		if (playlistFilter === SelectPlaylistFilter.ALL) return playlists;
		return [];
	};
	const isSelected = (playlist: SelectPlaylistPlaylist): boolean => {
		return (
			selectedPlaylists.find((p) => p.id === playlist.id) !== undefined
		);
	};
	const toggleSelected = (playlist: SelectPlaylistPlaylist) => {
		if (isSelected(playlist)) {
			updateSelectedPlaylists(
				selectedPlaylists.filter((p) => p.id !== playlist.id),
			);
			return;
		}

		updateSelectedPlaylists([...selectedPlaylists, playlist]);
	};

	return (
		<div className="grid grid-cols-2 gap-2">
			{playlists?.map((playlist) => (
				<div
					key={playlist.id}
					className={`${
						isSelected(playlist)
							? "bg-primary-container-high border-primary-container-high"
							: "border-primary"
					} flex flex-row gap-2 items-center justify-between cursor-pointer p-2 rounded-xl border transition-all`}
					onClick={() => {
						toggleSelected(playlist);
					}}>
					<div className="flex items-center gap-2">
						<img src={playlist.image} className="w-10 rounded" />
						<TextBody size="small">{playlist.name}</TextBody>
					</div>
					<div className="flex items-center gap-2">
						<TextLabel size="large">{playlist.owner}</TextLabel>
						<Chip size="small">
							{playlist.public ? "public" : "private"}
						</Chip>
					</div>
				</div>
			))}
		</div>
	);
}
