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
  const body = await req.json();
  const id = "69234aa304f7b30c70e61d51";
  return ok(await rootContainer.resolve(EventController).createEvent(id, body));
};
