import { NextRequest, NextResponse } from "next/server";
import { NextMiddlewareResult } from "next/dist/server/web/types";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export default async function middleware(
	req: NextRequest,
): Promise<NextMiddlewareResult> {
	const token = await getToken({ req, raw: true });

	console.log("get Token successfull");

	if (!token) {
		const { origin, basePath, pathname, search } = req.nextUrl;
		const signInUrl = new URL(`${basePath}/api/auth/signin`, origin);
		signInUrl.searchParams.append(
			"callbackUrl",
			`${basePath}${pathname}${search}`,
		);
		return NextResponse.redirect(signInUrl);
	}

	console.log("authOptions", authOptions);
	/*const session = await getServerSession(authOptions);
	console.log("session", session);*/

	return NextResponse.next();
}

export const config = {
	matcher: ["/session/:path*"],
};
