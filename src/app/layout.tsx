import "./globals.css";
import React from "react";
import { FontSetup } from "@components/general/Font";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={"font-outfit min-h-screen bg-accent-dark"}>
				<FontSetup />
				{children}
			</body>
		</html>
	);
}
