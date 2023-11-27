"use client";
import FilterOptionsBuilder, {
	ExtendedFilterOptions,
} from "@app/dashboard/spotify/organize/process/FilterOptionsBuilder";
import filterSongs, { filterAndGroupSongs } from "@lib/organize";
import { useState } from "react";
import { DetailedTrackObject } from "@app/api/spotify/me/tracks/types";
import CoverImage from "@components/atoms/CoverImage";
import TextLabel from "@components/text/TextLabel";
import Collapsable from "@components/atoms/Collapsable";
import PlayButton from "@components/atoms/PlayButton";
import { SpotifyImage } from "next-auth/providers/spotify";
import { ImageObject } from "@lib/spotify/generated";

interface Props {
	songs: DetailedTrackObject[];
}

interface Playlist {
	name: string;
	songs: DetailedTrackObject[];
}

export default function FilterPage({ songs }: Props) {
	const [generatedPlaylists, setGeneratedPlaylists] = useState<
		Playlist[] | undefined
	>(undefined);
	const onGenerate = (options: ExtendedFilterOptions) => {
		if (options.groupByGenre) {
			const result = filterAndGroupSongs<DetailedTrackObject>(
				songs,
				options,
			);

			const playlists: Playlist[] = [];
			result.forEach((v, k) => playlists.push({ name: k, songs: v }));
			setGeneratedPlaylists(playlists);
			return;
		}
		const result = filterSongs<DetailedTrackObject>(songs, options);
		setGeneratedPlaylists([{ name: "Result", songs: result }]);
	};

	console.log(generatedPlaylists);

	return (
		<div className="grid grid-cols-3 gap-8 mb-32">
			<FilterOptionsBuilder onGenerate={onGenerate} />
			<div className="col-span-2 grid grid-cols-2 gap-4">
				{generatedPlaylists && (
					<>
						<div
							className={`${
								generatedPlaylists.length <= 1
									? "col-span-2"
									: ""
							} flex flex-col gap-4`}>
							{generatedPlaylists
								.slice(
									0,
									Math.ceil(generatedPlaylists.length / 2),
								)
								.map((p) => (
									<DisplayPlaylist
										playlist={p}
										key={p.name}
									/>
								))}
						</div>
						{generatedPlaylists.length > 1 && (
							<div className="flex flex-col gap-4">
								{generatedPlaylists
									.slice(
										Math.ceil(
											generatedPlaylists.length / 2,
										),
										generatedPlaylists.length,
									)
									.map((p) => (
										<DisplayPlaylist
											playlist={p}
											key={p.name}
										/>
									))}
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}

interface DisplayPlaylistProps {
	playlist: Playlist;
}

function DisplayPlaylist({ playlist }: DisplayPlaylistProps) {
	const getSmallestImageURL = (
		images?: ImageObject[],
	): string | undefined => {
		return images?.reduce((current, previous) =>
			current &&
			current.width &&
			current.height &&
			previous.height &&
			previous.width &&
			current.height < previous.height &&
			current.width < previous.width
				? current
				: previous,
		).url;
	};

	return (
		<div className="bg-primary-container rounded-3xl">
			<Collapsable
				className="px-4 py-1"
				text={`${playlist.name
					.charAt(0)
					.toUpperCase()}${playlist.name.slice(1)}`}>
				<div className="flex flex-col px-4 py-2 rounded-b-3xl transition-all bg-primary-surface text-on-primary-container gap-2">
					{playlist.songs.map((song) => (
						<div
							key={song.id}
							className="flex justify-between items-center gap-2">
							<div className="flex gap-4 w-10/12">
								<CoverImage
									padding="p-1"
									borderRadius="rounded-full"
									className="h-14 w-14 flex-shrink-0"
									shadow={false}
									image={getSmallestImageURL(
										song.album?.images,
									)}
								/>
								<div className="flex flex-col flex-grow truncate">
									<TextLabel
										size="large"
										className="truncate">
										{song.name}
									</TextLabel>
									<TextLabel
										size="medium"
										className="truncate">
										{song.artists
											? song.artists[0].name
											: "No artist"}
									</TextLabel>
								</div>
							</div>
							<PlayButton
								height="h-8"
								audioSrc={
									song.preview_url
										? song.preview_url
										: undefined
								}
							/>
						</div>
					))}
				</div>
			</Collapsable>
		</div>
	);
}
