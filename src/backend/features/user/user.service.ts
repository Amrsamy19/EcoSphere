import { inject, injectable } from "tsyringe";
import type { IUserRepository } from "./user.repository";
import { User } from "@/generated/prisma/client";



export interface IUserService {
	getAll(): Promise<User[]>;
	getById(id: string): Promise<User | null>;
}

@injectable()
class UserService {
	constructor(
		@inject("IUserRepository") private readonly userRepository: IUserRepository
	) {}

	async getAll(): Promise<User[]> {
		return await this.userRepository.getAll();
	}

	async getById(id: string): Promise<User | null> {
		return await this.userRepository.getById(id);
	}
}


export default UserService;
