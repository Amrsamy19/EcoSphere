import { rootContainer } from "@/backend/config/container";
import UserController from "@/backend/features/user/user.controller";
import { requireAuth } from "@/backend/utils/authHelper";
import { ApiResponse, ok, serverError } from "@/types/api-helpers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
	req: NextRequest
): Promise<NextResponse<ApiResponse<{ message: string }>>> => {
	const body = await req.json();
	try {
		const user = await requireAuth();
		const response = rootContainer
			.resolve(UserController)
			.addUserPoints(user.id, body.gameDifficulty);
		return ok(response);
	} catch (error) {
		console.error(error);
		return serverError(error!.message);
	}
};
