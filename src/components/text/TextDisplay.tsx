import {PropsWithChildren} from "react";
import Text, {TypographyProps} from "@components/text/Text";

/**
 * As the largest text on the screen, display styles are reserved for short,
 * important text or numerals.
 */
export default function TextDisplay({
	bold = true,
	...props
}: PropsWithChildren<TypographyProps>) {
	return (
		<Text
			mapSizeToTextSize={mapSizeToTextSize}
			boldness={"font-extrabold"}
			bold={bold}
			{...props}
		/>
	);
}

function mapSizeToTextSize(size: TypographyProps["size"]) {
	switch (size) {
		case "small":
			return "text-7xl lg:text-8xl";
		case "medium":
			return "text-8xl lg:text-9xl";
		case "large":
			return "text-9xl lg:text-10xl";
	}
}
