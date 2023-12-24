"use client";
import { PropsWithChildren } from "react";
import Text, { TypographyProps } from "@components/text/Text";

/**
 * Label styles are smaller, utilitarian styles,
 * used for things like the text inside components
 * or for very small text in the content body,
 * such as captions.
 */
export default function TextLabel(props: PropsWithChildren<TypographyProps>) {
	return (
		<Text
			mapSizeToTextSize={mapSizeToTextSize}
			boldness={"font-bold"}
			{...props}
		/>
	);
}

function mapSizeToTextSize(size: TypographyProps["size"]) {
	switch (size) {
		case "small":
			return "text-sm";
		case "medium":
			return "text-base";
		case "large":
			return "text-lg";
	}
}
