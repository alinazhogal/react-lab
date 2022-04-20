import {
  ActionsType,
  GamesState,
  getFilteredGames,
  getSearchedGames,
  getTopGames,
  setSearchedLoading,
  setFilteredGames,
  setTopGames,
} from "../types";

const initialState = {
  games: [],
  isSearchLoading: false,
  isTopLoading: false,
  searchedGames: undefined,
  isFilterLoading: false,
};

const gamesReducer = (
  // eslint-disable-next-line default-param-last
  state: GamesState = initialState,
  action: getSearchedGames | getTopGames | setSearchedLoading | getFilteredGames | setFilteredGames | setTopGames
) => {
  switch (action.type) {
    case ActionsType.GET_TOP_GAMES:
      return { ...state, isTopLoading: true };
    case ActionsType.SET_TOP_GAMES:
      return { ...state, isTopLoading: false, games: action.payload };
    case ActionsType.GET_FILTERED_GAMES:
      return { ...state, isFilterLoading: true };
    case ActionsType.SET_FILTERED_GAMES:
      return { ...state, isFilterLoading: false, games: action.payload };
    case ActionsType.GET_SEARCHED_GAMES:
      return { ...state, searchedGames: action.payload };
    case ActionsType.SET_SEARCH_LOADING:
      return { ...state, isSearchLoading: action.payload };

    default:
      return state;
  }
};
export default gamesReducer;
