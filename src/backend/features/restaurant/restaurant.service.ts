import { inject, injectable } from "tsyringe";
import type { IRestaurantRepository } from "./restaurant.repository";
import { Prisma, Restaurant } from "@/generated/prisma/client";

export interface IRestaurantService {
	create(
		location: string,
		rating: number,
		name: string,
		workingHours: string,
		phoneNumber: string,
		avatar: string,
		description: string
	): Promise<Restaurant>;
	getAll(): Promise<Restaurant[]>;
	getById(id: string): Promise<Restaurant | null>;
	updateById(
		id: string,
		data: Prisma.RestaurantUpdateInput
	): Promise<Restaurant | null>;
	deleteById(id: string): Promise<Restaurant | null>;
}

@injectable()
class RestaurantService {
	constructor(
		@inject("IRestaurantRepository")
		private readonly restaurantRepository: IRestaurantRepository
	) {}
	async create(
		location: string,
		rating: number,
		name: string,
		workingHours: string,
		phoneNumber: string,
		avatar: string,
		description: string
	): Promise<Restaurant> {
		return await this.restaurantRepository.create(
			location,
			rating,
			name,
			workingHours,
			phoneNumber,
			avatar,
			description
		);
	}
	async getAll(): Promise<Restaurant[]> {
		return await this.restaurantRepository.getAll();
	}
	async getById(id: string): Promise<Restaurant | null> {
		return await this.restaurantRepository.getById(id);
	}
	async updateById(
		id: string,
		data: Prisma.RestaurantUpdateInput
	): Promise<Restaurant | null> {
		return await this.restaurantRepository.updateById(id, data);
	}
	async deleteById(id: string): Promise<Restaurant | null> {
		return await this.restaurantRepository.deleteById(id);
	}
}
export default RestaurantService;
