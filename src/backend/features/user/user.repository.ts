import { injectable } from "tsyringe";
import { IUser, UserModel } from "./user.model";
import { DBInstance } from "@/backend/config/dbConnect";

export interface IUserRepository {
  getAll(): Promise<IUser[]>;
  getById(id: string): Promise<IUser | null>;
  updateById(id: string, data: Partial<IUser>): Promise<IUser | null>;
  updateFavorites(id: string, data: string[]): Promise<IUser | null>;
  deleteById(id: string): Promise<IUser | null>;
}

@injectable()
class UserRepository {
  async getAll(): Promise<IUser[]> {
    await DBInstance.getConnection();
    return await UserModel.find({}, { password: 0 });
  }
  async getById(id: string): Promise<IUser | null> {
    await DBInstance.getConnection();
    return await UserModel.findById(id, { password: 0 });
  }

  async updateById(id: string, data: Partial<IUser>): Promise<IUser | null> {
    const user = await this.getById(id);
    if (user) {
      return await UserModel.findByIdAndUpdate(id, data, { new: true });
    }
    return null;
  }

  async updateFavorites(id: string, data: string[]): Promise<IUser | null> {
    const user = await this.getById(id);

    if (user) {
      return await UserModel.findByIdAndUpdate(
        id,
        { favorites: data },
        { new: true }
      );
    }
    return null;
  }

  async deleteById(id: string): Promise<IUser | null> {
    await DBInstance.getConnection();
    return await UserModel.findByIdAndDelete(id);
  }
}

export default UserRepository;
