import { inject, injectable } from "tsyringe";
import type { IUserService } from "./user.service";
import { User } from "@/generated/prisma/client";
import "reflect-metadata";

@injectable()
class UserController {
	constructor(
		@inject("IUserService") private readonly userService: IUserService
	) {}

	async getAll(): Promise<User[]> {
		const users = await this.userService.getAll();
		return users;
	}

	async getById(id: string): Promise<User | null> {
		const user = await this.userService.getById(id);
		return user;
	}
}

export default UserController;
