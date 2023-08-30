"use client";

import { ArtistData } from "@/src/lib/interfaces";
import ArtistInfo from "@components/artistpage/ArtistInfo";
import ArtistTopSongs from "@components/artistpage/ArtistTopSongs";
import { BigHeading } from "@components/general/BigHeading";
import Loading from "@components/general/Loading";
import { MidHeading } from "@components/general/MidHeading";
import RelatedArtists from "@components/artistpage/RelatedArtist";
import { useParams } from "next/navigation";
import { useSpotifyApi } from "@lib/dataFetching";

const Page = () => {
	const { id } = useParams();
	const [data, session, loading] = useSpotifyApi<ArtistData>(
		`${process.env.API_URL}/spotify/artist/${id}`,
	);
	if (loading) {
		return (
			<div className="flex justify-center items-center w-full h-full">
				<Loading />
			</div>
		);
	}

	if (!data) return <div>Artist not found</div>;
	if (!session) return <div>Please login again</div>;

	return (
		<>
			<BigHeading text={data.name} />
			<div className="flex flex-col xl:flex-row">
				<div className="xl:w-3/5 flex flex-col justify-start xl:mr-8">
					<ArtistInfo artist={data} />
					<div className={"flex justify-start mt-5"}>
						<MidHeading text={"Related Artists"} />
					</div>

					<RelatedArtists relatedArtists={data.relatedArtists} />
				</div>
				<ArtistTopSongs topSongs={data.topSongs} />
			</div>
		</>
	);
};

export default Page;
