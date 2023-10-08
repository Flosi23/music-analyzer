import { NextResponse } from "next/server";
import { RouteHandlerFn } from "@lib/wrapper/types";

export default function withErrorHandling(
	callback: RouteHandlerFn,
): RouteHandlerFn {
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
