import { rootContainer } from "@/backend/config/container";
import UserController from "@/backend/features/user/user.controller";
import { hashPassword } from "@/backend/utils/helpers";
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


export const PUT = async (
	_req: NextRequest,
	context: { params: Promise<{ id: string }> }
) => {
	const { id } = await context.params;
	const body = await _req.json();
	const { email, name, password } = body as {
		email?: string;
		name?: string;
		password?: string;
	};

	const updateData: Record<string, string> = {};
	if (typeof email === "string") updateData.email = email;
	if (typeof name === "string") updateData.name = name;
	if (typeof password === "string") updateData.password = await hashPassword(password);

	if (Object.keys(updateData).length === 0) {
		return NextResponse.json(
			{ message: "No valid fields provided for update" },
			{ status: 400 }
		);
	}

	const controller = rootContainer.resolve(UserController);
	const result = await controller.updateById(id, updateData);
	return NextResponse.json({ message: "hello after db connection", result });
};

export const DELETE = async (
	_req: NextRequest,
	context: { params: Promise<{ id: string }> }
) => {
	const { id } = await context.params;
	const controller = rootContainer.resolve(UserController);
	const result = await controller.deleteById(id);
	return NextResponse.json({ message: "hello after db connection", result });
};