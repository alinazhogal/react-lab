import { getProfile, saveProfile, signIn, signUp, updatePassword, User } from "@/api/users";
import { SavableKeys, saveItemToStorage } from "@/helpers/storage";
import { AxiosError } from "axios";
import { ActionsType, AuthState } from "../types";

export const logOut = () => ({
  type: ActionsType.LOGOUT,
});

export function logIn(values: User, errorCallback: () => void) {
  return async (dispatch: (arg0: { type: ActionsType; payload?: string | boolean | AuthState }) => void) => {
    try {
      const { isAuth, username, phone, address, description } = await signIn(values);
      if (isAuth) {
        dispatch({ type: ActionsType.LOGIN, payload: { username: values.login, phone, description, address } });
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

export function changePassword(values: User) {
  return async (dispatch: (arg0: { type: ActionsType }) => void) => {
    await updatePassword(values);
    dispatch({ type: ActionsType.CHANGE_PASSWORD });
  };
}

export function saveProfileInfo(values: User) {
  return async (dispatch: (arg0: { type: ActionsType; payload: AuthState }) => void) => {
    await saveProfile(values);
    dispatch({ type: ActionsType.SAVE_PROFILE, payload: { ...values, username: values.newLogin || values.login } });
  };
}

export function getProfileInfo(user: string) {
  return async (dispatch: (arg0: { type: ActionsType; payload: AuthState }) => void) => {
    const { login, phone, address, description } = await getProfile(user);
    dispatch({ type: ActionsType.SAVE_PROFILE, payload: { username: login, phone, description, address } });
  };
}
