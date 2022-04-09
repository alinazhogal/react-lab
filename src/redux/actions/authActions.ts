import { signIn, signUp } from "@/api/users";
import { SavableKeys, saveItemToStorage } from "@/helpers/storage";
import { AxiosError } from "axios";
import { ActionsType } from "../types";

export interface User {
  login: string;
  password: string;
}

export const logOut = () => ({
  type: ActionsType.LOGOUT,
});

export function logIn(values: User) {
  return async (dispatch: (arg0: { type: ActionsType; payload?: string }) => void) => {
    try {
      const { isAuth, userName } = await signIn(values);
      if (isAuth) {
        dispatch({ type: ActionsType.LOGIN, payload: userName });
        saveItemToStorage(SavableKeys.User, JSON.stringify({ isAuth, userName }));
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        dispatch({ type: ActionsType.LOGIN_ERROR });
        // return err.response.data;
      }
    }
  };
}

export function SignUp(values: User) {
  return async (dispatch: (arg0: { type: ActionsType; payload: string }) => void) => {
    const { isAuth, userName } = await signUp(values);
    dispatch({ type: ActionsType.SIGNUP, payload: userName });
    saveItemToStorage(SavableKeys.User, JSON.stringify({ isAuth, userName }));
  };
}
