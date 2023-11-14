import { FormEventHandler, PropsWithChildren } from "react";

export interface TypographyProps {
	size: "small" | "medium" | "large";
	className?: string;
	bold?: boolean;
	contentEditable?: boolean;
	onChange?: FormEventHandler<HTMLDivElement>;
	onBlur?: FormEventHandler<HTMLDivElement>;
}

interface Props extends TypographyProps {
	mapSizeToTextSize: (size: TypographyProps["size"]) => string;
	boldness: string;
}

export default function Text({
	mapSizeToTextSize,
	boldness,
	size,
	bold,
	className,
	children,
	contentEditable,
	onChange,
	onBlur,
}: PropsWithChildren<Props>) {
	return (
		<div
			className={`${mapSizeToTextSize(size)} ${
				bold ? boldness : "font-normal"
			} ${className}`}
			onBlur={onBlur}
			onChange={onChange}
			contentEditable={contentEditable}>
			{children}
		</div>
	);
}
