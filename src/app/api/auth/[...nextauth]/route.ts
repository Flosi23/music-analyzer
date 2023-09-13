import NextAuth, { NextAuthOptions, Session } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@lib/prisma";
import * as process from "process";
import { SPOTIFY_LOGIN_URL } from "@lib/spotify/config";

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	adapter: PrismaAdapter(prisma),
	providers: [
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID || "",
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
			authorization: SPOTIFY_LOGIN_URL,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
	],
	callbacks: {
		async session({ session, user, token }): Promise<Session> {
			const accounts = await prisma.account.findMany({
				where: { userId: user.id },
			});

			return {
				...session,
				accounts,
			};
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
