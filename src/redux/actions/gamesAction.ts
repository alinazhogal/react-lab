import api from "@/api";
import { Game, Platforms } from "@/components/home/games/games.types";
import { ActionsType } from "../types";

export interface GameCardValues {
  name: string;
  image: string;
  genre: string;
  price: number;
  description: string;
  age: string;
  platforms: Platforms[];
}

export function getTopGames() {
  return async (dispatch: (arg0: { type: ActionsType; payload?: Game[] }) => void) => {
    dispatch({ type: ActionsType.GET_TOP_GAMES });
    const response = await api.get<Game[]>("/api/getTopProducts");
    const { data } = response;
    dispatch({ type: ActionsType.SET_TOP_GAMES, payload: data });
  };
}

export function getSearchedGames(value: string) {
  return async (dispatch: (arg0: { type: ActionsType; payload: boolean | Game[] | undefined }) => void) => {
    dispatch({ type: ActionsType.GET_SEARCHED_GAMES, payload: undefined });
    dispatch({ type: ActionsType.SET_SEARCH_LOADING, payload: true });
    const response = await api.get<Game[]>(`/api/search/${value}`);
    const { data } = response;
    dispatch({ type: ActionsType.GET_SEARCHED_GAMES, payload: data });
    dispatch({ type: ActionsType.SET_SEARCH_LOADING, payload: false });
  };
}

export function getFiltered(
  platform: string | undefined,
  genre: string,
  age: string,
  sortCriteria: string,
  sortType: string,
  search?: string | undefined
) {
  return async (dispatch: (arg0: { type: ActionsType; payload?: Game[] | undefined }) => void) => {
    dispatch({ type: ActionsType.GET_FILTERED_GAMES });
    const response = await api.get<Game[]>("/api/products", {
      params: { platform, genre, age, sortCriteria, sortType, search },
    });
    const { data } = response;
    dispatch({ type: ActionsType.SET_FILTERED_GAMES, payload: data });
  };
}

export function addGame(values: GameCardValues) {
  return async (dispatch: (arg0: { type: ActionsType; payload: Game }) => void) => {
    const response = await api.post("/api/product", { ...values });
    const newGame = response.data;
    dispatch({ type: ActionsType.ADD_GAME, payload: newGame });
  };
}

export function updateGame(values: Game) {
  return async (dispatch: (arg0: { type: ActionsType; payload: Game }) => void) => {
    const response = await api.put("/api/product", { values });
    const updatedGame = response.data;
    dispatch({ type: ActionsType.UPDATE_GAME, payload: updatedGame });
  };
}

export function deleteGame(id: number) {
  return async (dispatch: (arg0: { type: ActionsType; payload: number }) => void) => {
    await api.delete(`/api/product/${id}`);
    dispatch({ type: ActionsType.DELETE_GAME, payload: id });
  };
}
