import { injectable } from "tsyringe";
import { ILoginStrategy } from "./login.service";
import { LoginRequestDTO, LoginResponseDTO } from "../dto/user.dto";

@injectable()
class ShopLoginStrategy implements ILoginStrategy {
	constructor() {}
	login(date: LoginRequestDTO): Promise<LoginResponseDTO> {
		console.log(date);
		throw new Error("Method not implemented, shop login");
	}
}

export { ShopLoginStrategy };
