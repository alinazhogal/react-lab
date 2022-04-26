import { Game, Platforms } from "@/components/home/games/games.types";

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
  SET_TOP_GAMES = "SET_TOP_GAMES",
  GET_SEARCHED_GAMES = "GET_SEARCHED_GAMES",
  GET_FILTERED_GAMES = "GET_FILTERED_GAMES",
  SET_FILTERED_GAMES = "SET_FILTERED_GAMES",
  SET_SEARCH_LOADING = "SET_SEARCH_LOADING",
  GET_CART = "GET_CART",
  ADD_CART_ITEM = "ADD_CART_ITEM",
  UPDATE_CART_ITEM = "UPDATE_CART_ITEM",
  DELETE_CART_ITEM = "DELETE_CART_ITEM",
  BUY_ORDER = "BUY_ORDER",
  CLEAR_CART = "CLEAR_CART",
}

export interface ModalState {
  isOpen: boolean;
  callbackLink: string | undefined;
}

export interface SetSignInOpen {
  type: ActionsType.SET_SIGNIN_OPEN;
  payload: { isOpen: boolean; callbackLink: string };
}

export interface AuthState {
  username: string;
  isAuth?: boolean;
  description?: string;
  phone?: string;
  address?: string;
  photo?: string;
}

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

export interface ChangePassword {
  type: ActionsType.CHANGE_PASSWORD;
}

export interface SaveProfile {
  type: ActionsType.SAVE_PROFILE;
  payload: {
    username: string;
    address: string;
    phone: string;
    description: string;
    photo: string;
  };
}

export interface GetProfile {
  type: ActionsType.GET_PROFILE;
  payload: {
    username: string;
    address: string;
    phone: string;
    description: string;
    photo: string;
  };
}

export interface GamesState {
  games: Game[];
  searchedGames: Game[] | undefined;
  isSearchLoading: boolean;
  isTopLoading: boolean;
  isFilterLoading: boolean;
}

export interface getTopGames {
  type: ActionsType.GET_TOP_GAMES;
}

export interface setTopGames {
  type: ActionsType.SET_TOP_GAMES;
  payload: Game[];
}

export interface getFilteredGames {
  type: ActionsType.GET_FILTERED_GAMES;
}

export interface setFilteredGames {
  type: ActionsType.SET_FILTERED_GAMES;
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

export interface CartItem {
  id: number;
  name: string;
  platforms: Platforms[];
  selectedPlatform: Platforms;
  date: string;
  amount: number;
  price: number;
}

export interface GetCart {
  type: ActionsType.GET_CART;
  payload: CartItem[];
}
export interface AddCartItem {
  type: ActionsType.ADD_CART_ITEM;
  payload: CartItem;
}

export interface DeleteCartItem {
  type: ActionsType.DELETE_CART_ITEM;
  payload: string;
}

export interface BuyOrder {
  type: ActionsType.BUY_ORDER;
}

export interface ClearCart {
  type: ActionsType.CLEAR_CART;
}

export interface UpdateCartItem {
  type: ActionsType.UPDATE_CART_ITEM;
  payload: CartItem[];
}
