import { inject, injectable } from "tsyringe";
import { ILoginStrategy } from "./login.service";
import { type IAuthRepository } from "../auth.repository";
import type { LoginRequestDTO, LoginResponseDTO } from "../dto/user.dto";
import { generateToken, OMIT } from "@/backend/utils/helpers";
@injectable()
class UserLoginStrategy implements ILoginStrategy {
	constructor(
		@inject("IAuthRepository") private readonly authRepository: IAuthRepository
	) {}
	async login(data: LoginRequestDTO): Promise<LoginResponseDTO> {
		const user = await this.authRepository.findByEmail(data.email);

		if (!user) throw new Error("User not found");
		if (!(await user.comparePassword(data.password)))
			throw new Error("Invalid email or password");

		const token = generateToken({
			id: user._id!,
			lastName: user.lastName,
			email: user.email,
			role: user.role,
		});

		const response = OMIT(user, "password");
		return {
			token,
			user: response._doc,
		};
	}
}

export { UserLoginStrategy };
