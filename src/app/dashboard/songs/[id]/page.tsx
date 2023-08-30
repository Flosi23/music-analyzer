"use client";

import ArtistView from "@components/songpage/ArtistView";
import BarChart from "@components/songpage/BarChart";
import { BigHeading } from "@components/general/BigHeading";
import BigTileContainer from "@components/songpage/BigTileContainer";
import Info from "@components/songpage/Info";
import Loading from "@components/general/Loading";
import SmallTileContainer from "@components/songpage/SmallTileContainer";
import { SongData } from "@lib/interfaces";
import SongImage from "@components/songpage/SongImage";
import SongPreview from "@components/songpage/SongPreview";
import { useSpotifyApi } from "@lib/dataFetching";

const Page = ({ params }: { params: { id: String } }) => {
	const { id } = params;
	//fetch data
	const [data, session, loading] = useSpotifyApi<SongData>(
		`${process.env.API_URL}/spotify/song/${id}`,
	);

	if (loading)
		return (
			<div className="flex justify-center items-center w-full h-full">
				<Loading />
			</div>
		);

	if (!data) return <>Song not found</>;

	if (!session) return <>No Session please login again</>;

	console.log(data.previewUrl);

	return (
		<>
			<BigHeading text={data.name} />
			<div className="flex justify-center items-center ">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
					<SongImage imageUrl={data.album.images[0]} />
					<BigTileContainer>
						<Info
							album={data.album.name}
							releaseDate={data.releaseDate}
							releaseDatePrecision={data.releaseDatePrecision}
							keyl={data.key}
							mode={data.mode}
							bpm={data.bpm}
							durationMs={data.durationMs}
							genres={data.genres}
						/>
					</BigTileContainer>
					<BigTileContainer>
						<BarChart
							popularity={data.popularity}
							danceability={data.danceability}
							energy={data.energy}
							loudness={data.loudness}
							speechiness={data.speechiness}
							acousticness={data.acousticness}
							instrumentalness={data.instrumentalness}
							liveness={data.liveness}
							valence={data.valence}
						/>
					</BigTileContainer>
					{data.previewUrl != null ? (
						<SmallTileContainer>
							<SongPreview src={data.previewUrl} />
						</SmallTileContainer>
					) : (
						<></>
					)}
					{data.artists.slice(0, 2).map((artist) => (
						<SmallTileContainer key={artist.id}>
							<ArtistView key={artist.id} artist={artist} />
						</SmallTileContainer>
					))}
				</div>
			</div>
		</>
	);
};

export default Page;
