export enum ActionsType {
  SET_SIGNIN_OPEN = "SET_SIGNIN_OPEN",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SIGNUP = "SIGNUP",
  RESTORE_USER = "RESTORE_USER",
}

export type ModalState = {
  isOpen: boolean;
};

export interface SetSignInOpen {
  type: ActionsType.SET_SIGNIN_OPEN;
  payload: boolean;
}

export type AuthState = {
  username: string;
  isAuth: boolean;
};

export interface Login {
  type: ActionsType.LOGIN;
  payload: string;
}

export interface SignUp {
  type: ActionsType.SIGNUP;
  payload: string;
}

export interface Logout {
  type: ActionsType.LOGOUT;
}

export interface RestoreUser {
  type: ActionsType.RESTORE_USER;
  payload: { isAuth: boolean; username: string };
}
