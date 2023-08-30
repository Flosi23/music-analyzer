import { CoverImage } from "@components/general/CoverImage";

type RelatedArtist = {
	name: string;
	id: string;
	image: string;
};

interface RelatedArtistProps {
	relatedArtists: RelatedArtist[];
}

const RelatedArtists = ({ relatedArtists }: RelatedArtistProps) => {
	return (
		<div className="flex justify-around w-full h-full gap-3 sm:gap-6 md:gap-10 lg:gap-14">
			{relatedArtists.slice(0, 3).map((artist, index) => (
				<RelatedArtistCard key={index} artist={artist} />
			))}
		</div>
	);
};

const RelatedArtistCard = ({ artist }: { artist: RelatedArtist }) => {
	return (
		<a
			className="accent-box flex flex-col items-center p-2 sm:p-4 md:p-5 cursor-pointer"
			href={"/dashboard/artists/" + artist.id}>
			<div className={"shadow-box-[0.5rem] md:shadow-box-sm"}>
				<CoverImage imageUrl={artist.image} rounded />
			</div>
			<div className={"flex justify-end w-full mt-2"}>
				<p className={"font-bold text-xl text-right"}>{artist.name}</p>
			</div>
		</a>
	);
};

export default RelatedArtists;
