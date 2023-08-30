const GenresNames = ({ genres }: { genres: string[] }) => {
	//reduce genres to 4
	let genresReduced: string[] = genres;
	if (genres.length < 4) {
		genresReduced = genres.slice(0, 4);
	}
	const gridRows: number = Math.ceil(genresReduced.length / 2);

	return (
		<div className={`grid grid-rows-${gridRows} grid-cols-2 w-full`}>
			{genresReduced.map((genre) => {
				return (
					<div
						className=" bg-accent-white text-black rounded-xl m-2 p-2 font-bold text-xl overflow-auto "
						key={genre}>
						{genre}
					</div>
				);
			})}
		</div>
	);
};

export default GenresNames;
