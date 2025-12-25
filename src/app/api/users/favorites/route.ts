import { rootContainer } from "@/backend/config/container";
import UserController from "@/backend/features/user/user.controller";
import { getCurrentUser } from "@/backend/utils/authHelper";
import {
  ApiResponse,
  badRequest,
  serverError,
  ok,
  unauthorized,
} from "@/types/api-helpers";
import { NextRequest, NextResponse } from "next/server";
import { IProduct } from "@/types/ProductType";

export const GET = async (): Promise<NextResponse<ApiResponse<IProduct[]>>> => {
  const session = await getCurrentUser();
  if (!session?.id) {
    return unauthorized();
  }

  const controller = rootContainer.resolve(UserController);
  try {
    const { favoritesIds } = await controller.getById(
      session.id,
      "favoritesIds"
    );

    const result = await controller.getFavoriteMenuItems(
      favoritesIds as string[]
    );

   
    
    return ok(result);
  } catch (error) {
    console.error(error);
    return serverError("Something went wrong");
  }
};

export const PATCH = async (
  _req: NextRequest
): Promise<NextResponse<ApiResponse<IProduct[]>>> => {
  const session = await getCurrentUser();
  if (!session?.id) {
    return unauthorized();
  }
  const body = await _req.json();
  const { ids } = body as { ids?: string };
  const controller = rootContainer.resolve(UserController);

  if (!ids) {
    return badRequest("Missing favoritesIds");
  }

  try {
    const { favoritesIds } = await controller.updateFavorites(session.id, ids);

    const result = await controller.getFavoriteMenuItems(
      favoritesIds as string[]
    );
    return ok(result);
  } catch (error) {
    console.error(error);
    return serverError("Something went wrong");
  }
};
