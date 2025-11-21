import { inject, injectable } from "tsyringe";
import { IUser } from "../../user/user.model";
import type { ILoginFactory } from "./login.strategy.factory";

interface ILoginStrategy {
	login<T, V>(data: T): Promise<V>;
}

@injectable()
class LoginService {
	constructor(
		@inject("LoginFactory") private readonly strategyFactory: ILoginFactory
	) {}

	async login<T extends IUser>(data: T) {
		const strategy = this.strategyFactory.getStrategy(data.userType);
		return await strategy.login(data);
	}
}
export { type ILoginStrategy, LoginService };
