import {
  ApiResponse,
  badRequest,
  ok,
  serverError,
  unauthorized,
} from "@/types/api-helpers";
import { NextRequest, NextResponse } from "next/server";
import { IProduct } from "@/types/ProductType";
import { getCurrentUser } from "@/backend/utils/authHelper";
import { rootContainer } from "@/backend/config/container";
import UserController from "@/backend/features/user/user.controller";

export const PATCH = async (
  req: NextRequest
): Promise<NextResponse<ApiResponse<IProduct[]>>> => {
  const session = await getCurrentUser();
  if (!session?.id) return unauthorized();

  const body = (await req.json()) as
    | { action: "toggle"; id: string }
    | { action: "sync"; ids: string[] }
    | { action: "clear" };

  const controller = rootContainer.resolve(UserController);

  try {
    let favoritesIds: string[] = [];

    switch (body.action) {
      case "sync": {
        const res = await controller.saveFavorites(session.id, body.ids);
        favoritesIds = res.favoritesIds as string[];
        break;
      }

      case "toggle": {
        const res = await controller.updateFavorites(session.id, body.id);
        favoritesIds = res.favoritesIds as string[];
        break;
      }

      case "clear": {
        const res = await controller.clearFavorites(session.id);
        favoritesIds = res.favoritesIds as string[];
        break;
      }

      default:
        return badRequest("Invalid action");
    }

    const result = await controller.getFavoriteMenuItems(favoritesIds);
    return ok(result);
  } catch (error) {
    console.error(error);
    return serverError("Something went wrong");
  }
};
