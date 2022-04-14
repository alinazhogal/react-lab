import { getSearchedGames, getTopGames } from "@/api/games";
import { Game } from "@/components/home/games/games.types";
import { ActionsType } from "../types";

export function getGames() {
  return async (dispatch: (arg0: { type: ActionsType; payload: boolean | Game[] }) => void) => {
    dispatch({ type: ActionsType.SET_TOP_LOADING, payload: true });
    const data = await getTopGames();
    dispatch({ type: ActionsType.GET_TOP_GAMES, payload: data });
    dispatch({ type: ActionsType.SET_TOP_LOADING, payload: false });
  };
}

export function getSearched(value: string) {
  return async (dispatch: (arg0: { type: ActionsType; payload: boolean | Game[] | undefined }) => void) => {
    dispatch({ type: ActionsType.GET_SEARCHED_GAMES, payload: undefined });
    dispatch({ type: ActionsType.SET_SEARCH_LOADING, payload: true });
    const data = await getSearchedGames(value);
    dispatch({ type: ActionsType.GET_SEARCHED_GAMES, payload: data });
    dispatch({ type: ActionsType.SET_SEARCH_LOADING, payload: false });
  };
}
