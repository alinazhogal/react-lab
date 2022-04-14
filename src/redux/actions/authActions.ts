import { getProfile, saveProfile, signIn, signUp, updatePassword, User } from "@/api/users";
import { SavableKeys, saveItemToStorage } from "@/helpers/storage";
import { AxiosError } from "axios";
import { ActionsType, AuthState } from "../types";

export const logOut = () => ({
  type: ActionsType.LOGOUT,
});

export function logIn(values: User, successCallback: () => void, errorCallback: () => void) {
  return async (dispatch: (arg0: { type: ActionsType; payload: string | boolean }) => void) => {
    try {
      const { isAuth, username } = await signIn(values);
      if (isAuth) {
        dispatch({ type: ActionsType.LOGIN, payload: values.login });
        successCallback();
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

export function register(values: User, cb: () => void) {
  return async (dispatch: (arg0: { type: ActionsType; payload: string }) => void) => {
    const { isAuth, username } = await signUp(values);
    dispatch({ type: ActionsType.SIGNUP, payload: username });
    saveItemToStorage(SavableKeys.User, JSON.stringify({ isAuth, username }));
    cb();
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
    saveItemToStorage(SavableKeys.User, JSON.stringify({ isAuth: true, username: values.newLogin || values.login }));
    dispatch({ type: ActionsType.SAVE_PROFILE, payload: { ...values, username: values.newLogin || values.login } });
  };
}

export function getProfileInfo(username: string) {
  return async (dispatch: (arg0: { type: ActionsType; payload: AuthState }) => void) => {
    const { login, phone, address, description, photo } = await getProfile(username);
    dispatch({
      type: ActionsType.GET_PROFILE,
      payload: {
        username: login,
        phone: phone || "",
        description: description || "",
        address: address || "",
        photo: photo || "",
      },
    });
  };
}
