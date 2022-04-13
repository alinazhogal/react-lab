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

export function logIn(values: User, errorCallback: () => void) {
  return async (dispatch: (arg0: { type: ActionsType; payload?: string | boolean }) => void) => {
    try {
      const { isAuth, username } = await signIn(values);
      if (isAuth) {
        dispatch({ type: ActionsType.LOGIN, payload: username });
        dispatch({ type: ActionsType.SET_SIGNIN_OPEN, payload: false });
        saveItemToStorage(SavableKeys.User, JSON.stringify({ isAuth, username }));
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        errorCallback();
      }
    }
  };
}

export function register(values: User) {
  return async (dispatch: (arg0: { type: ActionsType; payload: string }) => void) => {
    const { isAuth, username } = await signUp(values);
    dispatch({ type: ActionsType.SIGNUP, payload: username });
    saveItemToStorage(SavableKeys.User, JSON.stringify({ isAuth, username }));
  };
}
