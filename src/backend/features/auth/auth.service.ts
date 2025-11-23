import { inject, injectable } from "tsyringe";
import type { IAuthRepository } from "./auth.repository";
import {
	comparePassword,
	generateToken,
	hashPassword,
	OMIT,
} from "../../utils/helpers";
import type {
	LoginRequestDTO,
	RegisterRequestDTO,
	LoginResponseDTO,
} from "./dto/user.dto";
import { IUser } from "../user/user.model";

export interface IAuthService {
	login(
		loginDto: LoginRequestDTO
	): Promise<{ token: string; user: Omit<User, "password"> } | null>;
	register(
		registerDto: RegisterRequestDTO
	): Promise<{ token: string; user: Omit<User, "password"> } | null>;
	logout(): Promise<void>;
}

@injectable()
class AuthService {
	constructor(
		@inject("IAuthRepository") private readonly authRepository: IAuthRepository
	) {}

	public async login({
		email,
		password,
	}: LoginRequestDTO): Promise<LoginResponseDTO | null> {
		const user = await this.authRepository.findUserByEmail(email);
		if (user) {
			const isMatch = await comparePassword(password, user.password);
			if (isMatch) {
				const token = generateToken({
					id: user._id!,
					email: user.email,
					lastName: user.lastName,
					role: user.role,
				});

				const data = OMIT(user, "password");

				return {
					token,
					user: data as IUser,
				};
			}
		}
		return null;
	}

	public async register({
		email,
		name,
		password,
		birthDate,
		address,
		avatar,
		gender,
		phoneNumber,
	}: RegisterRequestDTO): Promise<{ token: string; user: User } | null> {
		const existingUser = await this.authRepository.findUserByEmail(email);
		if (!existingUser) {
			const hashed = await hashPassword(password);
			const userGender = Gender[gender as keyof typeof Gender];
			const user = await this.authRepository.register(
				email,
				name,
				hashed,
				birthDate,
				address,
				avatar,
				userGender,
				phoneNumber
			);

			const token = generateToken({
				id: user.id,
				lastName: "test", // it should be user.lastName
				email: user.email,
				role: user.role,
			});

			return {
				token,
				user,
			};
		}
		return null;
	}
	public async me(): Promise<void> {
		return;
	}
	public async logout(): Promise<void> {
		return;
	}
}

export default AuthService;
