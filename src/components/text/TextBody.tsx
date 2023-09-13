import {TypographyProps} from "@components/text/common";
import {PropsWithChildren} from "react";

/**
 * Body styles are used for longer
 * passages of text in your app.
 */
export default function TextBody({
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
			return "text-xl";
		case "medium":
			return "text-2xl";
		case "large":
			return "text-3xl";
	}
}
