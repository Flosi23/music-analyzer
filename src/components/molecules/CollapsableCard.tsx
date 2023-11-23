import Collapsable, { CollapsableProps } from "@components/atoms/Collapsable";
import { PropsWithChildren } from "react";
import Card from "@components/atoms/Card";

interface Props extends CollapsableProps {}

export default function CollapsableCard({
	children,
	...props
}: PropsWithChildren<Props>) {
	return (
		<Card className="p-0">
			<Collapsable className="px-4" {...props}>
				<div className="rounded-b-3xl px-4 py-2">{children}</div>
			</Collapsable>
		</Card>
	);
}
