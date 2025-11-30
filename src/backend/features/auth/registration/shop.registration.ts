import { inject, injectable } from "tsyringe";
import { IRegistrationStrategy } from "./registration.service";
import { RegisterResponseDTO, ShopRegisterDTO } from "../dto/user.dto";
import type { IAuthRepository } from "../auth.repository";
import { mapRestaurantToTokenPayload, mapShopToPublicProfile } from "../mappers";
import { generateToken } from "@/backend/utils/helpers";
import { container } from "tsyringe";
import { ImageService } from "@/backend/services/image.service";

@injectable()
class ShopRegistration implements IRegistrationStrategy {
	constructor(
		@inject("IAuthRepository") private readonly authRepo: IAuthRepository
	) {}
	async register(data: ShopRegisterDTO): Promise<RegisterResponseDTO> {
		const isShopExists = await this.authRepo.existsShopByEmail(data.email);
		if (isShopExists) throw new Error("user already exists.");

        let avatarKey = data.avatar;

        // Check if avatar is a Base64 string
        if (data.avatar && data.avatar.startsWith("data:image")) {
            const matches = data.avatar.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            if (matches && matches.length === 3) {
                const mimeType = matches[1];
                const buffer = Buffer.from(matches[2], "base64");
                
                const imageService = container.resolve(ImageService);
                avatarKey = await imageService.uploadImage(buffer, mimeType);
            }
        }

        // Create a copy of data with the key instead of Base64
        const shopData = { ...data, avatar: avatarKey };

		const savedShop = await this.authRepo.saveNewShop(shopData);
		const token = generateToken(mapRestaurantToTokenPayload(savedShop));
		return {
			token,
			user: await mapShopToPublicProfile(savedShop),
		};
	}
}
export { ShopRegistration };
