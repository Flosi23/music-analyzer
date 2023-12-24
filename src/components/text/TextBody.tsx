"use client";
import { PropsWithChildren } from "react";
import Text, { TypographyProps } from "@components/text/Text";

/**
 * Body styles are used for longer
 * passages of text in your app.
 */
export default function TextBody(props: PropsWithChildren<TypographyProps>) {
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
			return "text-xl";
		case "medium":
			return "text-2xl";
		case "large":
			return "text-3xl";
	}
}
