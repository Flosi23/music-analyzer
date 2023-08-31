"use client";

import "./globals.css";
import React from "react";
import { FontSetup } from "@components/general/Font";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={"font-outfit min-h-screen bg-accent-dark"}>
				<SessionProvider>
					<FontSetup />
					{children}
				</SessionProvider>
			</body>
		</html>
	);
}
