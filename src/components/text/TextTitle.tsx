"use client";
import { PropsWithChildren } from "react";
import Text, { TypographyProps } from "@components/text/Text";

/**
 * Titles are smaller than headline styles,
 * and should be used for medium-emphasis text that remains
 * relatively short.
 * For example, consider using title styles
 * to divide secondary passages of text or secondary
 * regions of content.
 */
export default function TextTitle({
	bold = true,
	...props
}: PropsWithChildren<TypographyProps>) {
	return (
		<Text
			mapSizeToTextSize={mapSizeToTextSize}
			boldness={"font-semibold"}
			bold={bold}
			{...props}
		/>
	);
}

function mapSizeToTextSize(size: TypographyProps["size"]) {
	switch (size) {
		case "small":
			return "text-2xl";
		case "medium":
			return "text-3xl";
		case "large":
			return "text-4xl";
	}
}
