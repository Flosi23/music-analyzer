import React, { PropsWithChildren } from "react";

export default function OrderedList({ children }: PropsWithChildren<{}>) {
	return (
		<div className="flex flex-col gap-4">
			{React.Children.map(children, (child, i) => (
				<div className="flex flex-row items-center gap-4">
					<div className="flex flex-row flex-shrink-0 items-center justify-center gap-4 bg-primary text-on-primary w-11 h-11 rounded-full">
						{i + 1}
					</div>
					<div>{child}</div>
				</div>
			))}
		</div>
	);
}
