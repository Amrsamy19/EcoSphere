export interface AnalyzedItemDTO {
	type: string;
	count: number;
	confidence: number;
}

export interface RecycleAnalysisResponseDTO {
	items: AnalyzedItemDTO[];
	totalEstimatedWeight: number; // kg
	estimatedCarbonSaved: number; // kg CO2e
	warnings?: string[];
}

export interface VisionWorkflowInput {
	image: {
		type: "base64" | "url";
		value: string;
	};
}

export interface RoboflowPrediction {
	class: string;
	confidence: number;
	// add other fields if present in your workflow output
}

export interface RoboflowResponse {
	predictions: RoboflowPrediction[];
	// workflow specific structure might vary, adapting to generic
	outputs?: {
		[key: string]: any;
	};
}

// Pagination DTOs for Recycle Dashboard
import { RecycleResponse } from "./recycle.types";

export interface RecyclePageOptions {
	page?: number;
	limit?: number;
	sort?: "default" | "createdAtAsc" | "createdAtDesc";
	status?: string;
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
