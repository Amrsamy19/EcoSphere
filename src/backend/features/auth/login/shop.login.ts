import { injectable } from "tsyringe";
import { ILoginStrategy } from "./login.service";

@injectable()
class ShopLoginStrategy implements ILoginStrategy {
	constructor() {}
	login<T, V>(date: T): Promise<V> {
		console.log(date);
		throw new Error("Method not implemented, shop login");
	}
}

export { ShopLoginStrategy };
