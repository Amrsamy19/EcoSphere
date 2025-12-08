import { User } from "@/types/UserTypes";

export const getUserData = async (id: string): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  const { data } = await response.json();
  return data;
};
