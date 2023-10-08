import { NextRequest } from "next/dist/server/web/spec-extension/request";

export type RouteHandlerFn = (
	req: NextRequest,
	ctx: AppRouteHandlerFnContext,
) => void | Response | Promise<void | Response>;
