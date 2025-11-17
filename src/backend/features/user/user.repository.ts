import { injectable } from "tsyringe";
import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@/generated/prisma/client";


export interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  updateById(id: string, data: Prisma.UserUpdateInput): Promise<User | null>;
  deleteById(id: string): Promise<User | null>;
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

  async updateById(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
    const user = await this.getById(id);
    if (!user) {
      return null;
    }
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string): Promise<User | null> {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  }

}

export default UserRepository;
