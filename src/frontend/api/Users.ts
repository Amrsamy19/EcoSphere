import { Shop, User } from "@/types/UserTypes";

export const getUserData = async <T = User | Shop>(
  id: string,
  role: string
): Promise<T> => {
  const response =
    role === "shop"
      ? await fetch(`/api/shops/${id}`)
      : await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  const { data } = await response.json();
  return data as T;
};

export const updateUserPoints = async (
  points: number
) => {
  const response = await fetch(`/api/users/points`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ points }),
  });
  if (!response.ok) {
    throw new Error("Failed to update user points");
  }
  return response.json();
};
