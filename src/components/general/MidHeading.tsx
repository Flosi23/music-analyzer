"use client";

import React from "react";

interface BigHeadingProps {
	children?: React.ReactNode;
	text?: string;
}

export function MidHeading({ children, text }: BigHeadingProps) {
	return (
		<h1
			className={
				"font-roboto-mono text-3xl md:text-4xl lg:text-5xl font-bold mb-5"
			}>
			{children}
			{text}
		</h1>
	);
}
