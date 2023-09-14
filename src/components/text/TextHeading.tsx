import { TypographyProps } from "@components/text/common";
import { PropsWithChildren } from "react";

/**
 * Headlines are best-suited for short, high-emphasis text
 * on smaller screens.
 * These styles can be good for marking primary passages
 * of text or important regions of content.
 */
export default function TextHeading({
	size,
	className,
	children,
	bold = true,
}: PropsWithChildren<TypographyProps>) {
	return (
		<div
			className={`${mapTextSize(size)} ${
				bold ? "font-bold" : "font-normal"
			} ${className}`}>
			{children}
		</div>
	);
}

function mapTextSize(size: TypographyProps["size"]) {
	switch (size) {
		case "small":
			return "text-5xl";
		case "medium":
			return "text-6xl";
		case "large":
			return "text-7xl";
	}
}
