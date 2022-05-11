import {
  ActionsType,
  GamesState,
  getFilteredGames,
  getSearchedGames,
  getTopGames,
  setSearchedLoading,
  setFilteredGames,
  setTopGames,
  DeleteGameCard,
  AddGameCard,
  UpdateGameCard,
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
  action:
    | getSearchedGames
    | getTopGames
    | setSearchedLoading
    | getFilteredGames
    | setFilteredGames
    | setTopGames
    | DeleteGameCard
    | AddGameCard
    | UpdateGameCard
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
    case ActionsType.ADD_GAME:
      return { ...state, games: [...state.games, action.payload] };
    case ActionsType.UPDATE_GAME:
      return {
        ...state,
        games: state.games.map((game) => {
          if (game.id === action.payload.id) return action.payload;
          return game;
        }),
      };
    case ActionsType.DELETE_GAME:
      return { ...state, games: state.games.filter((game) => game.id !== action.payload) };
    default:
      return state;
  }
};
export default gamesReducer;
