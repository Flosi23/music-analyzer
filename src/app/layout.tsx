"use client";

import "./globals.css";
import React from "react";
import { SessionProvider } from "next-auth/react";
import FontProvider from "@components/text/FontProvider";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-surface">
				<FontProvider>
					<SessionProvider>
						<div className="min-h-screen pb-10 flex flex-col font-outfit">
							{children}
						</div>
					</SessionProvider>
				</FontProvider>
			</body>
		</html>
	);
}
