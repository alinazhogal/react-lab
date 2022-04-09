export enum ActionsType {
  SET_SIGNIN_OPEN,
  LOGIN,
  LOGOUT,
  SIGNUP,
  LOGIN_ERROR,
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

export interface LoginError {
  type: ActionsType.LOGIN_ERROR;
}
