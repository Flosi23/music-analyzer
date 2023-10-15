import Card from "@components/atoms/Card";
import TextHeading from "@components/text/TextHeading";
import TextBody from "@components/text/TextBody";
import Link from "next/link";
import { MouseEvent, useRef, useState } from "react";

interface Props {
	heading?: string;
	text?: string;
	image?: string;
	link?: string;
}

export default function IllustratedCard({ heading, text, image, link }: Props) {
	const [translateY, setTranslateY] = useState(0);
	const [translateX, setTranslateX] = useState(0);
	const cardRef = useRef<HTMLDivElement>(null);

	const MAX_TRANSLATE = 5;

	function onMouseMove(e: MouseEvent) {
		const card = cardRef.current;
		if (!card) {
			return;
		}

		const boundingClientRect = card.getBoundingClientRect();
		const cardCenterX = boundingClientRect.x + boundingClientRect.width / 2;
		const cardCenterY =
			boundingClientRect.y + boundingClientRect.height / 2;
		const relativeMouseX = e.clientX - cardCenterX;
		const relativeMouseY = e.clientY - cardCenterY;

		const relativeCenterDistanceX =
			relativeMouseX / (boundingClientRect.width / 2);
		const relativeCenterDistanceY =
			relativeMouseY / (boundingClientRect.height / 2);

		setTranslateX(relativeCenterDistanceX * MAX_TRANSLATE);
		setTranslateY(relativeCenterDistanceY * MAX_TRANSLATE);
	}

	const card = (
		<div onMouseMove={onMouseMove} ref={cardRef}>
			<Card className="bg-center bg-cover h-80 relative overflow-hidden">
				<div
					className="top-0 bottom-0 left-0 right-0 absolute bg-center opacity-10 bg-on-primary-container"
					style={{
						width: `${100 + MAX_TRANSLATE}%`,
						height: `${100 + MAX_TRANSLATE}%`,
						maskImage: `url("${image}")`,
						maskPosition: "center",
						transform: `translateX(${translateX}%) translateY(${translateY}%)`,
					}}></div>
				<TextHeading size={"large"} className="mb-4">
					{heading}
				</TextHeading>
				<TextBody size={"large"} className="w-3/4">
					{text}
				</TextBody>
			</Card>
		</div>
	);

	if (link) {
		return <Link href={link}>{card}</Link>;
	}

	return card;
}
