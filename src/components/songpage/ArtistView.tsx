import React from "react";
import { CoverImage } from "@components/general/CoverImage";

type ArtistType = {
	name: string;
	id: string;
	images: string[];
};

interface ArtistViewProps {
	artist: ArtistType;
}

const ArtistView = ({ artist }: ArtistViewProps) => {
	return (
		<a
			className="flex justify-between items-center w-full p-5 cursor-pointer"
			href={`/dashboard/artists/${artist.id}`}>
			<p className="font-bold text-white text-2xl">{artist.name}</p>
			<div className={"w-36 bg-accent-white p-3 rounded-xl"}>
				<CoverImage imageUrl={artist.images[0]} />
			</div>
		</a>
	);
};

export default ArtistView;
