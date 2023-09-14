import { TypographyProps } from "@components/text/common";
import { PropsWithChildren } from "react";

/**
 * Label styles are smaller, utilitarian styles,
 * used for things like the text inside components
 * or for very small text in the content body,
 * such as captions.
 */
export default function TextLabel({
	size,
	children,
	className,
	bold = false,
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
			return "text-sm";
		case "medium":
			return "text-base";
		case "large":
			return "text-lg";
	}
}
