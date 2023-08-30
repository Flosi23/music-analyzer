interface CoverImageProps {
	imageUrl: string;
	rounded?: boolean;
}

export function CoverImage({ imageUrl, rounded }: CoverImageProps) {
	return (
		<img
			alt={"cover"}
			src={imageUrl}
			className={`w-full object-contain ${rounded ? "rounded-xl" : ""}`}
		/>
	);
}
