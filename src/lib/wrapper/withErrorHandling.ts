import { AppRouteHandlerFn } from "next/dist/server/future/route-modules/app-route/module";
import { NextResponse } from "next/server";

export default function withErrorHandling(
	callback: AppRouteHandlerFn,
): AppRouteHandlerFn {
	return async function (req, ctx) {
		try {
			return await callback(req, ctx);
		} catch (e) {
			console.error(e);
			const typed: Error = e as Error;
			return NextResponse.json({ error: typed.message }, { status: 503 });
		}
	};
}
