export interface RecyclePageOptions {
	page?: number;
	limit?: number;
	sort?: "default" | "createdAtAsc" | "createdAtDesc";
	status?: string;
}

export interface RecycleResponse {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	address: {
		city: string;
		neighborhood?: string;
		street: string;
		buildingNumber: string;
		floor: number;
		apartmentNumber?: number;
	};
	recycleItems: { itemType: string; weight: number }[];
	userId?: string;
	isVerified?: boolean;
	totalCarbonSaved?: number;
	status?: string;
	createdAt: string;
	updatedAt: string;
}

export interface PaginatedRecycleResponse {
	data: RecycleResponse[];
	metadata: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export async function getUserRecyclingEntries(userId: string) {
	try {
		const response = await fetch(`/api/recycle/user/${userId}`);
		if (!response.ok) {
			throw new Error("Failed to fetch recycling entries");
		}
		return await response.json();
	} catch (error) {
		console.error("Error fetching user recycling entries:", error);
		throw error;
	}
}

/**
 * Fetch paginated recycle requests for the dashboard
 */
export async function fetchRecycleRequests(
	options?: RecyclePageOptions
): Promise<PaginatedRecycleResponse> {
	try {
		const params = new URLSearchParams();
		if (options?.page) params.set("page", String(options.page));
		if (options?.limit) params.set("limit", String(options.limit));
		if (options?.sort) params.set("sort", options.sort);
		if (options?.status) params.set("status", options.status);

		const response = await fetch(`/api/recycle?${params.toString()}`);
		if (!response.ok) {
			throw new Error("Failed to fetch recycle requests");
		}
		const result = await response.json();
		return result.data;
	} catch (error) {
		console.error("Error fetching recycle requests:", error);
		throw error;
	}
}

/**
 * Update recycle request status
 */
export async function updateRecycleRequestStatus(
	id: string,
	status: string
): Promise<RecycleResponse> {
	try {
		const response = await fetch("/api/recycle", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ _id: id, status }),
		});

		if (!response.ok) {
			throw new Error("Failed to update recycle request status");
		}

		const result = await response.json();
		return result.data;
	} catch (error) {
		console.error("Error updating recycle request status:", error);
		throw error;
	}
}
