"use client";
import TextTitle from "@components/text/TextTitle";
import { useGetRequest } from "@lib/request/clientRequest";
import { SpotifyGetCurrentUsersPlaylistsResponse } from "@app/api/spotify/me/playlists/route";
import PageWrapper from "@components/templates/PageWrapper";
import TextHeading from "@components/text/TextHeading";
import SelectPlaylists, {
	SelectPlaylistFilter,
	SelectPlaylistPlaylist,
} from "@components/molecules/SelectPlaylists";
import { SimplifiedPlaylistObject } from "@lib/spotify/generated";
import { useState } from "react";
import Button from "@components/atoms/Button";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import SegmentedSelection from "@components/molecules/SegmentedSelection";

export default function Page() {
	const {
		data: playlists,
		loading,
		error,
		errorMessage,
	} = useGetRequest<SpotifyGetCurrentUsersPlaylistsResponse>(
		"/api/spotify/me/playlists",
	);

	const [selectedPlaylists, setSelectedPlaylists] = useState<
		SelectPlaylistPlaylist[] | undefined
	>(undefined);

	const [playlistFilter, setPlaylistFilter] = useState<SelectPlaylistFilter>(
		SelectPlaylistFilter.ALL,
	);

	const [includeLikedSongs, setIncludeLikedSongs] = useState<boolean>(true);

	return (
		<>
			<TextHeading size="small" className="mb-8">
				Select your playlists
			</TextHeading>
			<div className="flex flex-row gap-10 items-start">
				<div className="flex flex-col w-1/3">
					<SegmentedSelection<SelectPlaylistFilter>
						options={[
							{
								value: SelectPlaylistFilter.ALL,
								name: "Everything",
								description:
									"Select all playlists in your library",
							},
							{
								value: SelectPlaylistFilter.NONE,
								name: "Custom",
								description:
									"Select each playlist individually",
							},
						]}
						defaultOption={SelectPlaylistFilter.ALL}
						onSelect={setPlaylistFilter}
					/>
					<TextTitle size="medium" className="mt-8 mb-4">
						Include liked Songs?
					</TextTitle>
					<SegmentedSelection<boolean>
						options={[
							{
								value: true,
								name: "Yes",
								description: "Include my liked songs",
							},
							{
								value: false,
								name: "No",
								description: "Do not include my liked songs",
							},
						]}
						defaultOption={true}
						onSelect={setIncludeLikedSongs}
					/>
					<Button onClick={() => {}} className="mt-8 w-full">
						<div className="flex items-center gap-2">
							Continue
							<ArrowRightIcon className="w-5 h-5" />
						</div>
					</Button>
				</div>
				<div className="w-2/3">
					<PageWrapper
						errorMessage={errorMessage}
						error={error}
						loading={loading}>
						<SelectPlaylists
							onSelectionChanged={setSelectedPlaylists}
							playlists={playlists?.map(
								mapSpotifyPlaylistToSelectionPlaylist,
							)}
							playlistFilter={playlistFilter}
						/>
					</PageWrapper>
				</div>
			</div>
		</>
	);
}

function mapSpotifyPlaylistToSelectionPlaylist(
	playlist: SimplifiedPlaylistObject,
) {
	return {
		id: playlist.id,
		name: playlist.name,
		image: playlist.images ? playlist.images[0].url : "",
		owner:
			playlist.owner?.display_name == null
				? undefined
				: playlist.owner.display_name,
		public: playlist.public,
	};
}
