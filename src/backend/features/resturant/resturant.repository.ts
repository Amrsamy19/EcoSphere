import { injectable } from "tsyringe";
import { prisma } from "@/lib/prisma";
import { Prisma, Restaurant } from "@/generated/prisma/client";

export interface IRestaurantRepository {
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
  updateFavoritedBy(
    userId: string,
    restaurantId: string
  ): Promise<Restaurant | null>;
  deleteById(id: string): Promise<Restaurant | null>;
}

@injectable()
class RestaurantRepository {
  async create(
    location: string,
    rating: number,
    name: string,
    workingHours: string,
    phoneNumber: string,
    avatar: string,
    description: string
  ): Promise<Restaurant> {
    return await prisma.restaurant.create({
      data: {
        location,
        rating,
        name,
        workingHours,
        phoneNumber,
        avatar,
        description,
      },
    });
  }
  async getAll(): Promise<Restaurant[]> {
    return await prisma.restaurant.findMany({
      include: { reviews: true },
    });
  }
  async getById(id: string): Promise<Restaurant | null> {
    return await prisma.restaurant.findUnique({
      where: { id },
      include: { reviews: true },
    });
  }
  async updateById(
    id: string,
    data: Prisma.RestaurantUpdateInput
  ): Promise<Restaurant | null> {
    return await prisma.restaurant.update({
      where: { id },
      data,
    });
  }
  async updateFavoritedBy(
    userId: string,
    restaurantId: string
  ): Promise<Restaurant | null> {
    const restaurant = await this.getById(restaurantId);
    if (restaurant) {
      const isFavorited = restaurant.userIds.includes(userId);
      const updatedUserIds = isFavorited
        ? restaurant.userIds.filter((id) => id !== userId)
        : [...restaurant.userIds, userId];
      return await prisma.restaurant.update({
        where: { id: restaurantId },
        data: { userIds: updatedUserIds },
      });
    }
    return null;
  }
  async deleteById(id: string): Promise<Restaurant | null> {
    return await prisma.restaurant.delete({
      where: { id },
    });
  }
}

export default RestaurantRepository;
