import Card from "@components/atoms/Card";
import CoverImage from "@components/atoms/CoverImage";
import React from "react";
import Chip from "@components/atoms/Chip";
import TextHeading from "@components/text/TextHeading";
import TextBody from "@components/text/TextBody";

interface Props {
	image?: string;
	followers?: number;
	popularity?: string;
	genres?: string[];
}

export default function ArtistOverview({
	image,
	followers,
	popularity,
	genres,
}: Props) {
	return (
		<Card className="flex justify-between">
			<CoverImage
				className="flex-shrink-0"
				imageHeight="h-52"
				padding="p-4"
				shadowSize={1}
				image={image}
				color="bg-white"
				shadowColor="shadow-primary-container-low"
			/>
			<div className="ml-6 flex-grow">
				<TextHeading size="small">
					{followers ? followers.toLocaleString() : followers}
				</TextHeading>
				<TextBody size="medium">Followers</TextBody>
				<div className="mt-4 flex gap-2 flex-wrap">
					{genres?.map((genre) => <Chip>{genre}</Chip>)}
				</div>
			</div>
		</Card>
	);
}
