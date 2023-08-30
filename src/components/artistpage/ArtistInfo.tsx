import { ArtistData } from "@lib/interfaces";
import GenresNames from "../general/GenresNames";
import { decodePopulatity } from "@lib/decoding";
import { CoverImage } from "@components/general/CoverImage";
import React from "react";

const ArtistInfo = ({ artist }: { artist: ArtistData }) => {
	console.log(artist);

	return (
		<div className="flex w-full justify-center items-center accent-box p-5 flex-col xl:flex-row">
			<div className={"w-1/3 shadow-box-[1rem]"}>
				<CoverImage imageUrl={artist.images[0]} rounded />
			</div>
			<div className="flex flex-col justify-center items-start w-full xl:w-2/3 m-1 xl:m-5">
				<table className="w-full mb-3">
					<tbody className="w-full">
						<tr>
							<TableHeading heading="Followers" />
							<td className="text-2xl ">
								{artist.followersCount}
							</td>
						</tr>
						<tr>
							<TableHeading heading="Popularity" />
							<td>
								<td className="text-2xl">
									{decodePopulatity(artist.popularity)}
								</td>
							</td>
						</tr>
					</tbody>
				</table>
				<GenresNames genres={artist.genres} />
			</div>
		</div>
	);
};

interface TableHeadingProps {
	heading?: string;
	children?: string;
}

function TableHeading({ heading, children }: TableHeadingProps) {
	return (
		<td className="text-2xl font-bold">{heading ? heading : children}:</td>
	);
}

export default ArtistInfo;
