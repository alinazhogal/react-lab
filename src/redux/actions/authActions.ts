import api from "@/api";
import { SavableKeys, saveItemToStorage } from "@/helpers/storage";
import { AxiosError } from "axios";
import { ActionsType, AuthState, User } from "../types";

export const logOut = () => ({
  type: ActionsType.LOGOUT,
});

export function logIn(values: User, successCallback: () => void, errorCallback: () => void) {
  return async (dispatch: (arg0: { type: ActionsType; payload: boolean | AuthState }) => void) => {
    try {
      const response = await api.put("/api/auth/signIn", values);
      const { isAuth, username, role, phone, address, description, photo } = response.data;
      if (isAuth) {
        dispatch({
          type: ActionsType.LOGIN,
          payload: {
            username: values.login,
            role,
            phone: phone || "",
            address: address || "",
            description: description || "",
            photo: photo || "",
          },
        });
        successCallback();
        dispatch({ type: ActionsType.SET_SIGNIN_OPEN, payload: false });
        saveItemToStorage(SavableKeys.User, JSON.stringify({ username }));
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
  return async (dispatch: (arg0: { type: ActionsType; payload: AuthState }) => void) => {
    const response = await api.post("/api/auth/signUp", values);
    const { isAuth, username, role } = response.data;
    dispatch({ type: ActionsType.SIGNUP, payload: { username, role, isAuth } });
    saveItemToStorage(SavableKeys.User, JSON.stringify({ username }));
    cb();
  };
}

export function changePassword(values: User) {
  return async (dispatch: (arg0: { type: ActionsType }) => void) => {
    await api.post("/api/changePassword", values);
    dispatch({ type: ActionsType.CHANGE_PASSWORD });
  };
}

export function saveProfileInfo(values: User) {
  return async (dispatch: (arg0: { type: ActionsType; payload: AuthState }) => void) => {
    await api.post("/api/saveProfile", values);
    saveItemToStorage(SavableKeys.User, JSON.stringify({ username: values.newLogin || values.login }));
    dispatch({ type: ActionsType.SAVE_PROFILE, payload: { ...values, username: values.newLogin || values.login } });
  };
}

export function getProfileInfo(username: string) {
  return async (dispatch: (arg0: { type: ActionsType; payload: AuthState }) => void) => {
    const response = await api.get(`/api/getProfile/${username}`);
    const { login, phone, address, description, photo } = response.data;
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

export function getUser(login: string) {
  return async (dispatch: (arg0: { type: ActionsType; payload: string }) => void) => {
    const response = await api.get(`/api/auth/getUser/${login}`);
    const { role } = response.data;
    dispatch({ type: ActionsType.GET_USER, payload: role });
  };
}
