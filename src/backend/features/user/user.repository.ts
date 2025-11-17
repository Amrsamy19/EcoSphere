import { injectable } from "tsyringe";
import { prisma } from "@/lib/prisma";
import { User } from "@/generated/prisma/client";


export interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
}

@injectable()
class UserRepository {
  async getAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }
  async getById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

}

export default UserRepository;
