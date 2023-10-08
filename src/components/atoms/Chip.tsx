import { PropsWithChildren } from "react";
import TextLabel from "@components/text/TextLabel";

export default function Chip({ children }: PropsWithChildren<{}>) {
	return (
		<div className="bg-white text-black py-2 px-3 rounded-full">
			<TextLabel size="large">{children}</TextLabel>
		</div>
	);
}
