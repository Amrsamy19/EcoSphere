import { injectable } from "tsyringe";
import { IRegistrationStrategy } from "./registration.service";
import { RegisterRequestDTO, RegisterResponseDTO } from "../dto/user.dto";

@injectable()
class ShopRegistration implements IRegistrationStrategy {
	constructor() {}
	register(data: RegisterRequestDTO): Promise<RegisterResponseDTO> {
		console.log(data);
		throw new Error("Method not implemented., shop");
	}
}
export { ShopRegistration };
