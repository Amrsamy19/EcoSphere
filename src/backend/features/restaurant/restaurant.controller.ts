import { inject, injectable } from "tsyringe";
import type { IRestaurantService } from "./restaurant.service";
import "reflect-metadata";

@injectable()
class RestaurantController {
	constructor(
		@inject("IRestaurantService")
		private readonly restaurantService: IRestaurantService
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
		return await this.restaurantService.create(
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
		return await this.restaurantService.getAll();
	}
	async getById(id: string): Promise<Restaurant | null> {
		return await this.restaurantService.getById(id);
	}
	async updateById(
		id: string,
		data: Prisma.RestaurantUpdateInput
	): Promise<Restaurant | null> {
		return await this.restaurantService.updateById(id, data);
	}
	async deleteById(id: string): Promise<Restaurant | null> {
		return await this.restaurantService.deleteById(id);
	}
}
export default RestaurantController;
