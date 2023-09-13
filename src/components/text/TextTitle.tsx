import {TypographyProps} from "@components/text/common";
import {PropsWithChildren} from "react";

/**
 * Titles are smaller than headline styles,
 * and should be used for medium-emphasis text that remains
 * relatively short.
 * For example, consider using title styles
 * to divide secondary passages of text or secondary
 * regions of content.
 */
export default function TextTitle({
	size,
	children,
	className,
	bold = true,
}: PropsWithChildren<TypographyProps>) {
	return (
		<div
			className={`${mapTextSize(size)} ${
				bold ? "font-semibold" : "font-normal"
			} ${className}`}>
			{children}
		</div>
	);
}

function mapTextSize(size: TypographyProps["size"]) {
	switch (size) {
		case "small":
			return "text-2xl";
		case "medium":
			return "text-3xl";
		case "large":
			return "text-4xl";
	}
}
