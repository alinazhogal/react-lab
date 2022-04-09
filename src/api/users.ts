import api from ".";

export interface User {
  login: string;
  password: string;
}

export async function signUp(values: User) {
  const response = await api.post("/api/auth/signUp", values);
  return response.data;
  // try {
  //   const response = await api.post("/api/auth/signUp", values);
  //   return response.data;
  // } catch (error) {
  //   const err = error as AxiosError;
  //   if (err.response) {
  //     return false;
  //   }
  // }

  // return false;
}

export async function signIn(values: User) {
  const response = await api.put("/api/auth/signIn", values);
  return response.data;
}
