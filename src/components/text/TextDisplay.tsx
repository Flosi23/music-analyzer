import {TypographyProps} from "@components/text/common";
import {PropsWithChildren} from "react";

/**
 * As the largest text on the screen, display styles are reserved for short,
 * important text or numerals.
 */
export default function TextDisplay({
	size,
	children,
	className,
	bold = true,
}: PropsWithChildren<TypographyProps>) {
	return (
		<div
			className={`${mapTextSize(size)} ${
				bold ? "font-extrabold" : "font-normal"
			} ${className}`}>
			{children}
		</div>
	);
}

function mapTextSize(size: TypographyProps["size"]) {
	switch (size) {
		case "small":
			return "text-8xl";
		case "medium":
			return "text-9xl";
		case "large":
			return "text-10xl";
	}
}
