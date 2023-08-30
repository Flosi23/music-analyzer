import { ArtistTopSong } from "@lib/interfaces";

import { MidHeading } from "../general/MidHeading";
import { CoverImage } from "../general/CoverImage";

interface ArtistTopSongsProps {
	topSongs: ArtistTopSong[];
}

const ArtistTopSongs = ({ topSongs }: ArtistTopSongsProps) => {
	topSongs = topSongs.slice(0, 10);

	return (
		<div className="xl:w-2/5 flex flex-auto flex-col justify-start items-center">
			<div className={"w-full flex justify-start mt-5 xl:mt-0"}>
				<MidHeading text="Top Songs" />
			</div>

			<div className={"w-full flex flex-auto flex-col gap-7"}>
				{topSongs.slice(0, 3).map((song, index) => (
					<ArtistTopSong key={index} topSong={song} />
				))}
			</div>
		</div>
	);
};

interface ArtistTopSongProps {
	topSong: ArtistTopSong;
}

const ArtistTopSong = ({ topSong }: ArtistTopSongProps) => {
	return (
		<a
			className="accent-box flex justify-start h-full items-center p-4 md:p-5 xl:py-4 w-full cursor-pointer"
			href={"/dashboard/songs/" + topSong.id}>
			<div className={"mr-2"}>
				<div className={"shadow-box-[0.5rem] w-[7.5rem]"}>
					<CoverImage imageUrl={topSong.image} rounded />
				</div>
			</div>

			<div className={"flex xl:justify-center px-2 w-full"}>
				<p className="text-3xl font-bold ml-1">{topSong.name}</p>
			</div>
		</a>
	);
};

export default ArtistTopSongs;
