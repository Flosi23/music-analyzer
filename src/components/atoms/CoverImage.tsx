import ShadowBox from "@components/atoms/ShadowBox";

interface Props {
	image?: string;
	imageHeight?: string;
	shadow?: boolean;
	padding?: string;
	color?: string;
	shadowColor?: string;
	shadowSize?: number;
	borderRadius?: string;
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
	borderRadius = "rounded-3xl",
	className,
}: Props) {
	return (
		<ShadowBox
			size={shadow ? shadowSize : 0}
			color={shadowColor}
			borderRadius={borderRadius}
			className={`${color} ${padding} ${className}`}>
			<img
				className={`${borderRadius} ${imageHeight}`}
				src={image}
				alt="cover"
			/>
		</ShadowBox>
	);
}
