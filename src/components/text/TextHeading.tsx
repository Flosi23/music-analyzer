"use client";
import Text, { TypographyProps } from "@components/text/Text";
import { PropsWithChildren } from "react";

/**
 * Headlines are best-suited for short, high-emphasis text
 * on smaller screens.
 * These styles can be good for marking primary passages
 * of text or important regions of content.
 */

export default function TextHeading({
	bold = true,
	...props
}: PropsWithChildren<TypographyProps>) {
	return (
		<Text
			mapSizeToTextSize={mapSizeToTextSize}
			boldness={"font-bold"}
			bold={bold}
			{...props}
		/>
	);
}

function mapSizeToTextSize(size: TypographyProps["size"]) {
	switch (size) {
		case "small":
			return "text-5xl";
		case "medium":
			return "text-6xl";
		case "large":
			return "text-7xl";
	}
}
