import { inject, injectable } from "tsyringe";
import { User } from "@/src/generated/prisma/client";
import type { IAuthService } from "./auth.service";
import "reflect-metadata";

@injectable()
class AuthController {
  constructor(
    @inject("IAuthService") private readonly IAuthService: IAuthService
  ) {}

  async LogIn(
    email: string,
    password: string
  ): Promise<{ token: string; user: User } | null> {
    return await this.IAuthService.login(email, password);
  }

  async Register(body: {
    email: string;
    name: string;
    password: string;
  }): Promise<{ token: string; user:User } | null> {
    return await this.IAuthService.register(
      body.email,
      body.name,
      body.password
    );
  }
}

export default AuthController;
