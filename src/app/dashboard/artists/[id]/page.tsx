"use client";
import { useGetRequest } from "@lib/request/clientRequest";
import TextHeading from "@components/text/TextHeading";
import { SpotifyGetArtistResponse } from "@app/api/spotify/artist/[id]/route";
import ArtistOverview from "@components/molecules/ArtistOverview";
import TextTitle from "@components/text/TextTitle";
import Link from "next/link";
import Card from "@components/atoms/Card";
import CoverImage from "@components/atoms/CoverImage";

interface Params {
	id: string;
}

export default function Page({ params }: { params: Params }) {
	const { data } = useGetRequest<SpotifyGetArtistResponse>(
		`/api/spotify/artist/${params.id}`,
		{
			caching: true,
		},
	);

	return (
		<>
			<div className="flex gap-6 mb-8 items-center">
				<div className="w-1/2">
					<TextHeading size="medium">{data?.name}</TextHeading>
				</div>
				<div className="w-1/2">
					<TextHeading size="small">Top Songs</TextHeading>
				</div>
			</div>
			<div className="flex gap-6">
				<div className="w-1/2 flex flex-col justify-between">
					<ArtistOverview
						genres={data?.genres}
						image={data?.images ? data.images[0].url : undefined}
						followers={data?.followers?.total}
					/>
					<div>
						<TextTitle size="large" className="mt-12 mb-4">
							Related Artists
						</TextTitle>
						<div className="grid grid-cols-3 gap-4">
							{data?.relatedArtists
								.slice(
									0,
									Math.min(3, data?.relatedArtists.length),
								)
								.map((artist) => (
									<Link
										key={artist.id}
										href={`/dashboard/artists/${artist.id}`}>
										<Card className="flex flex-col h-full gap-2">
											<CoverImage
												padding="p-2"
												shadow={false}
												image={
													artist.images
														? artist.images[0].url
														: undefined
												}
											/>
											<TextTitle size="small">
												{artist.name}
											</TextTitle>
										</Card>
									</Link>
								))}
						</div>
					</div>
				</div>
				<div className="w-1/2 grid grid-cols-2 gap-4 self-start">
					{data?.topSongs
						.slice(0, Math.min(4, data?.topSongs.length))
						.map((track) => (
							<Link
								key={track.id}
								href={`/dashboard/songs/${track.id}`}>
								<Card className="flex flex-col h-full gap-2">
									<CoverImage
										shadow={false}
										padding="p-3"
										image={track.album?.images[0].url}
									/>
									<TextTitle
										size="small"
										className="overflow-ellipsis overflow-hidden">
										{track.name}
									</TextTitle>
								</Card>
							</Link>
						))}
				</div>
			</div>
		</>
	);
}
