import { NextRequest } from "next/server";
import { rootContainer } from "@/backend/config/container";
import { RecycleController } from "@/backend/features/recycle/recycle.controller";
import { ok, serverError } from "@/types/api-helpers";
import {
	mapFromRawDataToRecyeleRequest,
	RecycleRequest,
	RecycleRowData,
} from "@/backend/features/recycle/recycle.types";
import { RecyclePageOptions } from "@/backend/features/recycle/recycle.dto";

export const GET = async (req: NextRequest) => {
	try {
		const { searchParams } = new URL(req.url);

		const options: RecyclePageOptions = {
			page: parseInt(searchParams.get("page") || "1", 10),
			limit: parseInt(searchParams.get("limit") || "10", 10),
			sort:
				(searchParams.get("sort") as RecyclePageOptions["sort"]) || "default",
			status: searchParams.get("status") || undefined,
		};

		const response = await rootContainer
			.resolve(RecycleController)
			.listRecycleEntriesPaginated(options);
		return ok(response);
	} catch (error) {
		console.error(error);
		return serverError("can't fetch recycle requests");
	}
};

export const POST = async (req: NextRequest) => {
	const data = (await req.json()) as RecycleRowData;
	try {
		const response = await rootContainer
			.resolve(RecycleController)
			.createRecycleEntry(mapFromRawDataToRecyeleRequest(data));
		return ok(response);
	} catch (error) {
		console.error(error);
		return serverError("can't save recycle request");
	}
};

export const PATCH = async (req: NextRequest) => {
	const data = (await req.json()) as RecycleRequest;

	try {
		const response = await rootContainer
			.resolve(RecycleController)
			.updateRecycleEntry(`${data._id}`, data);
		return ok(response);
	} catch (error) {
		console.error(error);
		return serverError("can't update recycle request");
	}
};
