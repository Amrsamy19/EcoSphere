import { IRestaurant } from "../restaurant/restaurant.model";
import { IUser } from "../user/user.model";

export type LoginCommand = {
	email: string;
	password: string;
	userType: UserRole;
};

export type RegisterCommand = {
	user: Pick<IUser, "lastName" | "email" | "role" | "_id">;
} & { token: string };

import { imageService } from "../../services/image.service";

export const mapRegisterResultToDto = (
	command: RegisterCommand
): RegisterResponseDTO => {
	return {
		token: command.token,
		user: {
			_id: command.user._id.toString(),
			email: command.user.email,
			lastName: command.user.lastName,
			role: command.user.role,
		},
	};
};

export const mapUserToTokenPayload = (user: IUser) => {
	return {
		_id: user._id.toString(),
		email: user.email,
		lastName: user.lastName,
		role: user.role,
	};
};

export const mapRestaurantToTokenPayload = (user: IRestaurant) => {
	return {
		_id: user._id.toString(),
		email: user.email,
		name: user.name,
		role: "shop",
	};
};

export const mapUserAsEndUser = async (user: IUser) => {
	let avatarUrl = "";
	if (user.avatar?.key) {
		avatarUrl = await imageService.getSignedUrl(user.avatar.key);
	}

	return {
		_id: user._id.toString(),
		id: user._id.toString(),
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		address: user.address || "",
		avatar: avatarUrl,
		birthDate: user.birthDate,
		phoneNumber: user.phoneNumber,
		gender: user.gender,
		role: "customer",
		points: user.points || 0,
		favoritesIds: user.favoritesIds,
		cart: user.cart,
		paymentHistory: user.paymentHistory,
	};
};

export const mapUserAsOrganizer = async (user: IUser) => {
	let avatarUrl = "";
	if (user.avatar?.key) {
		avatarUrl = await imageService.getSignedUrl(user.avatar.key);
	}

	return {
		_id: user._id.toString(),
		id: user._id.toString(),
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		phoneNumber: user.phoneNumber,
		address: user.address || "",
		avatar: avatarUrl,
		birthDate: user.birthDate,
		gender: user.gender,
		role: "organizer",
		subscriptionPeriod: user.subscriptionPeriod,
		subscribed: user.subscribed,
		events: user.events,
	};
};

export const mapShopToPublicProfile = async (shop: IRestaurant) => {
	let avatarUrl = "";
	if (shop.avatar?.key) {
		avatarUrl = await imageService.getSignedUrl(shop.avatar.key);
	}

	return {
		_id: shop._id.toString(),
		email: shop.email,
		name: shop.name,
		role: "shop",
		phoneNumber: shop.phoneNumber,
		location: shop.location,
		avatar: avatarUrl,
		workingHours: shop.workingHours,
		description: shop.description || "",
		menu: shop.menus,
		reviews: shop.restaurantRating,
		subscribed: shop.subscribed,
		subscriptionPeriod: shop.subscriptionPeriod,
	};
};

export const mapUserToPublicProfile = async (user: IUser) => {
	let avatarUrl = "";
	if (user.avatar?.key) {
		avatarUrl = await imageService.getSignedUrl(user.avatar.key);
	}

	return {
		_id: user._id.toString(),
		id: user._id.toString(),
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		phoneNumber: user.phoneNumber,
		address: user.address || "",
		avatar: avatarUrl,
		birthDate: user.birthDate,
		gender: user.gender,
		role: user.role,
		points: user.points || 0,
		favoritesIds: user.favoritesIds,
		cart: user.cart,
		paymentHistory: user.paymentHistory,
		subscribed: user.subscribed,
		subscriptionPeriod: user.subscriptionPeriod,
		events: user.events,
	};
};
