import { rootContainer } from "@/backend/config/container";
import EventController from "@/backend/features/event/event.controller";
import { IEvent } from "@/backend/features/user/user.model";
import { ApiResponse, ok } from "@/types/api-helpers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest
): Promise<NextResponse<ApiResponse<IEvent[]>>> => {
  return ok(await rootContainer.resolve(EventController).getEvents());
};

export const POST = async (
  req: NextRequest
): Promise<NextResponse<ApiResponse<IEvent>>> => {
  const { userId, ...body } = await req.json();
  return ok(
    await rootContainer.resolve(EventController).createEvent(userId, body)
  );
};

export const PUT = async (
  req: NextRequest
): Promise<NextResponse<ApiResponse<IEvent>>> => {
  const { userId, ...body } = await req.json();
  return ok(
    await rootContainer.resolve(EventController).updateEvent(userId, body)
  );
};

export const DELETE = async (
  req: NextRequest
): Promise<NextResponse<ApiResponse<IEvent>>> => {
  const { userId, eventId } = await req.json();
  return ok(
    await rootContainer.resolve(EventController).deleteEvent(userId, eventId)
  );
};
