import api from ".";

export interface User {
  login: string;
  password: string;
  phone?: string;
  description?: string;
  address?: string;
}

export async function signUp(values: User) {
  const response = await api.post("/api/auth/signUp", values);
  return response.data;
}

export async function signIn(values: User) {
  const response = await api.put("/api/auth/signIn", values);
  return response.data;
}

export async function updatePassword(values: User) {
  await api.post("/api/auth/changePassword", values);
}
