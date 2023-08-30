import { LOGIN_URL, refreshAccessToken } from "@lib/spotify/auth";
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@lib/prisma";
import * as process from "process";

const handler = NextAuth({
	// Configure one or more authentication providers
	adapter: PrismaAdapter(prisma),
	providers: [
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID || "",
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
			authorization: LOGIN_URL,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
	],
	secret: process.env.JWT_SECRET,
	callbacks: {
		async jwt({ token, account, user }: any) {
			// initial sign in
			if (account && user) {
				console.log("accessToken", account.access_token);
				return {
					...token,
					accessToken: account.access_token,
					refreshToken: account.refresh_token,
					username: account.providerAccountId,
					accessTokenExpires: account.expires_at * 1000,
				};
			}
			// access token hasn't expired yet
			if (Date.now() < token.accessTokenExpires) {
				return token;
			}
			return await refreshAccessToken(token);
		},
		async session({ session, token }: any) {
			session.user.accessToken = token.accessToken;
			session.user.refreshToken = token.refreshToken;
			session.user.username = token.username;
			return session;
		},
	},
});

export { handler as GET, handler as POST };
