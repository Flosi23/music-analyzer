import React from "react";
import { CoverImage } from "@components/general/CoverImage";

interface ImageProps {
	imageUrl: string;
}

export default function SongImage({ imageUrl }: ImageProps) {
	return (
		<div className={"shadow-box-color-500 row-span-2 shadow-box-lg"}>
			<CoverImage imageUrl={imageUrl} rounded />
		</div>
	);
}
