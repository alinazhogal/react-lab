import { ActionsType, GamesState, getSearchedGames, getTopGames, setSearchedLoading, setTopLoading } from "../types";

const initialState = { games: [], isSearchLoading: false, isTopLoading: false, searchedGames: undefined };

const gamesReducer = (
  // eslint-disable-next-line default-param-last
  state: GamesState = initialState,
  action: getSearchedGames | getTopGames | setSearchedLoading | setTopLoading
) => {
  switch (action.type) {
    case ActionsType.GET_TOP_GAMES:
      return { ...state, games: action.payload };
    case ActionsType.GET_SEARCHED_GAMES:
      return { ...state, searchedGames: action.payload };
    case ActionsType.SET_SEARCH_LOADING:
      return { ...state, isSearchLoading: action.payload };
    case ActionsType.SET_TOP_LOADING:
      return { ...state, isTopLoading: action.payload };
    default:
      return state;
  }
};
export default gamesReducer;
