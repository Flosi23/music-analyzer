import { PropsWithChildren } from "react";
import TextLabel from "@components/text/TextLabel";

interface Props {
	size?: "medium" | "small";
}

export default function Chip({
	children,
	size = "medium",
}: PropsWithChildren<Props>) {
	return (
		<div
			className={`bg-white text-black py-2 px-3 rounded-full ${mapSizeToStyles(
				size,
			)}`}>
			<TextLabel size={size}>{children}</TextLabel>
		</div>
	);
}

function mapSizeToStyles(size: Props["size"]) {
	switch (size) {
		case "small":
			return "py-1 px-2";
		case "medium":
			return "py-2 px-3";
	}
}
