import { rootContainer } from "@/backend/config/container";
import EventController from "@/backend/features/event/event.controller";
import { IEvent } from "@/backend/features/user/user.model";
import { getCurrentUser } from "@/backend/utils/authHelper";
import {
  ApiResponse,
  ok,
  serverError,
  unauthorized,
} from "@/types/api-helpers";
import { NextRequest, NextResponse } from "next/server";
import { ImageService } from "@/backend/services/image.service";

const imageService = rootContainer.resolve(ImageService);

export const GET = async (
  req: NextRequest
): Promise<NextResponse<ApiResponse<IEvent[]>>> => {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return unauthorized();
    }
    return ok(
      await rootContainer.resolve(EventController).getEventsByUserId(user.id)
    );
  } catch (error) {
    console.error(error);
    return serverError("Something went wrong");
  }
};

export const POST = async (
  req: NextRequest
): Promise<NextResponse<ApiResponse<IEvent>>> => {
  try {
    const formData = await req.formData();
    const user = await getCurrentUser();
    if (!user?.id) {
      return unauthorized();
    }

    const body: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (key === "sections") {
        body[key] = JSON.parse(value as string);
      } else {
        body[key] = value;
      }
    });

    const avatar = formData.get("avatar") as File | null;
    if (avatar) {
      const buffer = Buffer.from(await avatar.arrayBuffer());
      const fileName = await imageService.uploadImage(buffer, avatar.type);
      const url = await imageService.getSignedUrl(fileName);
      body.avatar = { key: fileName, url };
    }

    return ok(
      await rootContainer.resolve(EventController).createEvent(user.id, body as IEvent)
    );
  } catch (error) {
    console.error(error);
    return serverError("Something went wrong");
  }
};

export const PUT = async (
  req: NextRequest
): Promise<NextResponse<ApiResponse<IEvent>>> => {
  try {
    const formData = await req.formData();
    const user = await getCurrentUser();
    if (!user?.id) {
      return unauthorized();
    }

    const body: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (key === "sections") {
        body[key] = JSON.parse(value as string);
      } else {
        body[key] = value;
      }
    });

    const avatar = formData.get("avatar") as File | null;
    if (avatar) {
      const buffer = Buffer.from(await avatar.arrayBuffer());
      const fileName = await imageService.uploadImage(buffer, avatar.type);
      const url = await imageService.getSignedUrl(fileName);
      body.avatar = { key: fileName, url };
    }

    return ok(
      await rootContainer
        .resolve(EventController)
        .updateEvent(user.id, body as IEvent)
    );
  } catch (error) {
    console.error(error);
    return serverError("Something went wrong");
  }
};

export const DELETE = async (
  req: NextRequest
): Promise<NextResponse<ApiResponse<IEvent>>> => {
  try {
    const { eventId } = await req.json();
    const user = await getCurrentUser();
    if (!user?.id) {
      return unauthorized();
    }
    return ok(
      await rootContainer.resolve(EventController).deleteEvent(user.id, eventId)
    );
  } catch (error) {
    console.error(error);
    return serverError("Something went wrong");
  }
};
