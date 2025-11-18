import { NextRequest, NextResponse } from "next/server";
import { rootContainer } from "@/backend/config/container";
import RestaurantController from "@/backend/features/resturant/resturant.controller";

export const GET = async (req: NextRequest) => {
    const controller = rootContainer.resolve(RestaurantController);
    const result = await controller.getAll();
    return NextResponse.json({ message: "hello after db connection", result });
}

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { location, rating, name, workingHours, phoneNumber, avatar, description } = body;
    const controller = rootContainer.resolve(RestaurantController);
    const result = await controller.create(location, rating, name, workingHours, phoneNumber, avatar, description);
    return NextResponse.json({ message: "hello after db connection", result });
}