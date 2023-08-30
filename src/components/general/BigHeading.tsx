"use client";
import React from "react";

interface BigHeadingProps {
	children?: React.ReactNode;
	text?: string;
}

export function BigHeading({ children, text }: BigHeadingProps) {
	return (
		<h1
			className={
				"font-roboto-mono mt-3 leading-11 text-5xl md:text-6xl lg:text-7xl font-bold pb-2 mb-3"
			}>
			{children}
			{text}
		</h1>
	);
}
