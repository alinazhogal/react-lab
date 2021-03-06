import { RootState } from "@/redux";
import { getTopGames, getSearchedGames } from "@/redux/actions/gamesAction";
import { ActionsType } from "@/redux/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "../../helpers/debounce";
import { Search, SearchResults } from "../../elements/search";
import Categories from "./categories/categories";
import Games from "./games/games";

function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useDispatch();
  const { searchedGames, isSearchLoading, games } = useSelector((state: RootState) => state.games);

  useEffect(() => {
    if (!games.length) {
      dispatch(getTopGames());
    }
  }, []);

  const fetchData = (value: string) => {
    if (value) {
      dispatch(getSearchedGames(value));
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    if (!e.target.value) {
      dispatch({ type: ActionsType.GET_SEARCHED_GAMES, payload: undefined });
      dispatch({ type: ActionsType.SET_SEARCH_LOADING, payload: false });
    } else {
      debounce(() => fetchData(e.target.value));
    }
  }

  return (
    <>
      <Search value={inputValue} onChange={(e) => handleChange(e)} loading={isSearchLoading} />
      {searchedGames !== undefined && inputValue && <SearchResults results={searchedGames} />}
      <Categories />
      <Games />
    </>
  );
}
export default Home;
