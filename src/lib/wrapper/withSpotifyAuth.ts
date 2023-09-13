import { NextRequest, NextResponse } from "next/server";
import { AppRouteHandlerFn } from "next/dist/server/future/route-modules/app-route/module";
import { Session } from "next-auth";
import SpotifyClient from "@lib/spotify";
import { ZodSchema } from "zod";
import withAuth, { WithAuthCallback } from "@lib/wrapper/withAuth";

type WithSpotifyAuthCallback<T extends ZodSchema> = (
	req: Parameters<WithAuthCallback<T>>[0],
	params: Parameters<WithAuthCallback<T>>[1],
	spotifyClient: SpotifyClient,
) => Promise<Response> | Response;

export function withSpotifyAuth<T extends ZodSchema>(
	callback: WithSpotifyAuthCallback<T>,
	zodSchema?: T,
): AppRouteHandlerFn {
	return withAuth<T>((req: NextRequest, params, session: Session) => {
		const spotifyAccount = session.accounts.find(
			(account) => account.provider === "spotify",
		);

		if (spotifyAccount == null) {
			return NextResponse.json(
				{ error: "No spotify account found" },
				{ status: 401 },
			);
		}

		if (spotifyAccount.access_token == null) {
			return NextResponse.json(
				{ error: "No spotify access token present" },
				{ status: 403 },
			);
		}

		const spotifyClient = new SpotifyClient(spotifyAccount);

		return callback(req, params, spotifyClient);
	}, zodSchema);
}
