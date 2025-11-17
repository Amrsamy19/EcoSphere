import { rootContainer } from "@/backend/config/container";
import UserController from "@/backend/features/user/user.controller";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
	_req: NextRequest,
	context: { params: Promise<{ id: string }> }
) => {
	const { id } = await context.params;
	const controller = rootContainer.resolve(UserController);
	const result = await controller.getById(id);
	return NextResponse.json({ message: "hello after db connection", result });
};
