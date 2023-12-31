import { z, ZodSchema } from "zod";
import withErrorHandling from "@lib/wrapper/withErrorHandling";
import { NextRequest, NextResponse } from "next/server";
import { AppRouteHandlerFn } from "next/dist/server/future/route-modules/app-route/module";
import { RouteHandlerFn } from "@lib/wrapper/types";

export type WithRequestValidationCallback<T extends ZodSchema> = (
	req: Parameters<AppRouteHandlerFn>[0],
	params: z.infer<T>,
) => Promise<Response> | Response;

const emptyZodSchema = z.object({});

export default function withRequestValidation<
	T extends ZodSchema = typeof emptyZodSchema,
>(
	callback: WithRequestValidationCallback<T>,
	zodSchema: ZodSchema = emptyZodSchema,
): RouteHandlerFn {
	return withErrorHandling(async (req, ctx) => {
		const rawInput = {
			...ctx.params,
			...extractRequestParametersFromRequest(req),
		};

		const result = zodSchema.safeParse(rawInput);
		if (!result.success) {
			return NextResponse.json(
				{ error: result.error.message },
				{ status: 400 },
			);
		}

		return callback(req, result.data as T);
	});
}

function extractRequestParametersFromRequest(
	req: NextRequest,
): Record<string, string> {
	const params = {
		...urlSearchParamsToObject(req.nextUrl.searchParams),
	};

	return params;
}

function urlSearchParamsToObject(urlSearchParams: URLSearchParams): any {
	const result: Record<string, any> = {};
	for (const [key, value] of urlSearchParams.entries()) {
		const asInt = Number(value);
		if (!isNaN(asInt)) {
			result[key] = asInt;
			continue;
		}

		if (value === "true") {
			result[key] = true;
			continue;
		}
		if (value === "false") {
			result[key] = false;
			continue;
		}

		result[key] = value;
	}
	return result;
}
