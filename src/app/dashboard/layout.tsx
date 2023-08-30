"use client";
import "@app/globals.css";
import React from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Header } from "@components/general/Header";

interface RootLayoutProps {
	children: React.ReactNode;
	session: Session;
}

export default function RootLayout({ children, session }: RootLayoutProps) {
	return (
		<html lang="en">
			<body className={"font-outfit min-h-screen bg-accent-dark"}>
				<SessionProvider session={session}>
					<Header />

					<div className={"flex justify-center"}>
						<main
							className={
								"w-full lg:w-box-normal m-0 px-6 md:px-10"
							}>
							{children}
						</main>
					</div>
				</SessionProvider>
			</body>
		</html>
	);
}
