import { Game } from "@/components/games/games.types";

export enum ActionsType {
  SET_SIGNIN_OPEN = "SET_SIGNIN_OPEN",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SIGNUP = "SIGNUP",
  RESTORE_USER = "RESTORE_USER",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
  SAVE_PROFILE = "SAVE_PROFILE",
  GET_PROFILE = "GET_PROFILE",
  GET_TOP_GAMES = "GET_TOP_GAMES",
  GET_SEARCHED_GAMES = "GET_SEARCHED_GAMES",
  SET_SEARCH_LOADING = "SET_SEARCH_LOADING",
  SET_TOP_LOADING = "SET_TOP_LOADING",
}

export interface ModalState {
  isOpen: boolean;
}

export interface SetSignInOpen {
  type: ActionsType.SET_SIGNIN_OPEN;
  payload: boolean;
}

export interface AuthState {
  username: string;
  isAuth?: boolean;
  description?: string;
  phone?: string;
  address?: string;
}

export interface Login {
  type: ActionsType.LOGIN;
  payload: { username: string; address: string; phone: string; description: string };
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

export interface ChangePassword {
  type: ActionsType.CHANGE_PASSWORD;
}

export interface GamesState {
  games: Game[];
  searchedGames: Game[] | undefined;
  isSearchLoading: boolean;
  isTopLoading: boolean;
}

export interface getTopGames {
  type: ActionsType.GET_TOP_GAMES;
  payload: Game[];
}

export interface getSearchedGames {
  type: ActionsType.GET_SEARCHED_GAMES;
  payload: Game[] | undefined;
}

export interface setSearchedLoading {
  type: ActionsType.SET_SEARCH_LOADING;
  payload: boolean;
}

export interface setTopLoading {
  type: ActionsType.SET_TOP_LOADING;
  payload: boolean;
}
