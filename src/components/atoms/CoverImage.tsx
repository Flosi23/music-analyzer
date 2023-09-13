import ShadowBox from "@components/atoms/ShadowBox";

interface Props {
	image?: string;
	imageHeight?: string;
	shadow?: boolean;
	padding?: string;
	color?: string;
	shadowColor?: string;
	shadowSize?: number;
	className?: string;
}

export default function CoverImage({
	image,
	imageHeight,
	shadow = true,
	padding = "p-6",
	color = "bg-white",
	shadowSize = 1.5,
	shadowColor,
	className,
}: Props) {
	return (
		<ShadowBox
			size={shadow ? shadowSize : 0}
			color={shadowColor}
			className={`${color} ${padding} ${className}`}>
			<img
				className={`rounded-xl ${imageHeight}`}
				src={image}
				alt="cover"
			/>
		</ShadowBox>
	);
}
