import { PropsWithChildren } from "react";
import TextLabel from "@components/text/TextLabel";

export default function Chip({ children }: PropsWithChildren<{}>) {
	return (
		<div className="bg-white text-black p-2 rounded">
			<TextLabel size="large">{children}</TextLabel>
		</div>
	);
}
