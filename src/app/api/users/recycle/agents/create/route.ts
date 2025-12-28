import { NextRequest, NextResponse } from "next/server";
import { rootContainer } from "@/backend/config/container";
import AuthController from "@/backend/features/auth/auth.controller";
import { NewRecycleAgentFormData } from "@/types/recycleAgent";

export const POST = async (req: NextRequest) => {
	const body = (await req.json()) as NewRecycleAgentFormData;
	const result = await rootContainer.resolve(AuthController).register(body);

	// Map user data for frontend consumption
	const userData = result.user
		? {
				id: `${result.user._id}`,
				firstName: result.user.firstName,
				lastName: result.user.lastName,
				email: result.user.email,
				phoneNumber: result.user.phoneNumber,
				birthDate: result.user.birthDate,
				role: result.user.role,
				agentType: "independent",
				isActive: result.user.isActive,
		  }
		: undefined;

	return NextResponse.json({ success: true, data: userData });
};
