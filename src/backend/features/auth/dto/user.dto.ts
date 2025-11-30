import { Gender, UserRole } from "../../user/user.model";

export type LoginRequestDTO = {
	email: string;
	password: string;
};

export type LoginResponse = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	birthDate: string;
	address: string;
	avatar?: string;
	gender: string;
	phoneNumber: string;
	role: LoginTypes;
    // Shop specific
    location?: string;
    workingHours?: string;
    description?: string;
    hotline?: string;
    name?: string;
};

// Type for the mapped user profile (what the frontend receives)
export type PublicUserProfile = {
    _id: string;
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    name?: string; // For restaurants
    phoneNumber?: string;
    address?: string;
    location?: string; // For restaurants
    avatar: string; // Always a string URL, not an object
    birthDate?: string;
    gender?: string;
    role: string;
    points?: number;
    favoritesIds?: string[];
    cart?: any[];
    paymentHistory?: any[];
    subscriptionPeriod?: Date | string;
    subscribed?: boolean;
    events?: any[];
    workingHours?: string; // For restaurants
    description?: string; // For restaurants
    menu?: any[];
    reviews?: any[];
    hotline?: number;
};

export type RegisterResponseDTO = {
	success: boolean;
};

export type UserTypes = UserRole | "shop";

export type FoundedUser = {
	_id: string;
	email: string;
	name: string;
	password: string;
	role: string;
	oAuthId?: string;
	accountProvider?: string;
	comparePassword?: (password: string) => Promise<boolean>;
};

export type OAuthUserDTO = RegisterRequestDTO &
	RegisterForConsumer & {
		role: UserTypes;
		oAuthId: string;
		provider?: string;
	};

export type UserRegisterDTO = RegisterWithCredentialsDTO &
	RegisterForConsumer &
	RegisterWithPhoneNumber & {
		birthDate: string;
		gender: Gender;
	};

export type ShopRegisterDTO = RegisterWithCredentialsDTO &
	RegisterWithPhoneNumber & {
		name: string;
		description: string;
		hotline: string;
		file: string;
		workingHours: string;
	};

export type RegisterRequestDTO = {
	email: string;
	role: UserTypes;
};

export type RegisterWithCredentialsDTO = RegisterRequestDTO & {
	password: string;
};

export type RegisterForConsumer = {
	firstName: string;
	lastName: string;
};

export type RegisterWithPhoneNumber = {
	phoneNumber: string;
};
