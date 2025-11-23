import { inject, injectable } from "tsyringe";
import { IRegistrationStrategy } from "./registration.service";
import type { IAuthRepository } from "../auth.repository";
import { generateToken } from "@/backend/utils/helpers";
import { RegisterRequestDTO, RegisterResponseDTO } from "../dto/user.dto";

@injectable()
class EndUserRegistration implements IRegistrationStrategy {
	constructor(
		@inject("IAuthRepository") private readonly authRepository: IAuthRepository
	) {}
	async register(data: RegisterRequestDTO): Promise<RegisterResponseDTO> {
		console.log(data);
		const isUserExists = await this.authRepository.existsByEmail(data.email);
		if (isUserExists) throw new Error("email already exists.");
		const savedUser = await this.authRepository.saveNewUser(data);

		const token = generateToken({
			id: savedUser._id!,
			lastName: savedUser.lastName!,
			email: savedUser.email!,
			role: savedUser.role!,
		});
		return { token, user: { id: savedUser._id!, ...savedUser._doc } };
	}
}

export { EndUserRegistration };
