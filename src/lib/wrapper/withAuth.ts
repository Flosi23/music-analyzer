import { ZodSchema } from "zod";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import withRequestValidation, {
	WithRequestValidationCallback,
} from "@lib/wrapper/withRequestValidation";
import { RouteHandlerFn } from "@lib/wrapper/types";

export type WithAuthCallback<T extends ZodSchema> = (
	req: Parameters<WithRequestValidationCallback<T>>[0],
	params: Parameters<WithRequestValidationCallback<T>>[1],
	session: Session,
) => Promise<Response> | Response;

export default function withAuth<T extends ZodSchema>(
	callback: WithAuthCallback<T>,
	zodSchema?: T,
): RouteHandlerFn {
	return withRequestValidation<T>(async (req, params) => {
		const session = await getServerSession(authOptions);

		if (session == null) {
			return NextResponse.json(
				{ error: "Unauthenticated" },
				{ status: 401 },
			);
		}

		return callback(req, params, session);
	}, zodSchema);
}
