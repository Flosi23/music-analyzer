"use client";
import React, {
	FormEventHandler,
	KeyboardEventHandler,
	PropsWithChildren,
	useRef,
} from "react";
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

const ENTER_KEY = "Enter";
export default function Text({
	mapSizeToTextSize,
	boldness,
	size,
	bold,
	className,
	children,
	contentEditable = false,
	onChange,
	onBlur,
}: PropsWithChildren<Props>) {
	const div = useRef<HTMLDivElement>(null);
	const onlyTextChildren = () => {
		return React.Children.toArray(children).every(
			(c) => typeof c === "string",
		);
	};

	const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
		if (contentEditable && e.key === ENTER_KEY && div.current) {
			div.current.blur();
		}
	};

	return (
		<div
			className={`${mapSizeToTextSize(size)} ${
				bold ? boldness : "font-normal"
			} ${className}`}
			onBlur={onBlur}
			onKeyDown={onKeyDown}
			onChange={onChange}
			contentEditable={contentEditable}
			suppressContentEditableWarning={
				contentEditable && onlyTextChildren()
			}
			ref={div}>
			{children}
		</div>
	);
}
