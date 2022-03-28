import { getTopGames, getSearchedGames } from "@/api/games";
import { Search, SearchResults } from "@/elements/search";
import { useEffect, useState } from "react";
import debounce from "../helpers/debounce";
import Categories from "./categories/categories";
import Games from "./games/games";
import { Game } from "./games/games.types";

function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const [topGames, setTopGames] = useState<Game[]>([]);
  const [gamesLoading, setGamesLoading] = useState<boolean>(false);
  const [searchedGames, setSearchedGames] = useState<Game[]>();
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setGamesLoading(true);
      const data = await getTopGames();
      setTopGames(data);
      setGamesLoading(false);
    })();
  }, []);

  const fetchData = async (value: string) => {
    if (value) {
      setSearchedGames(undefined);
      setSearchLoading(true);
      const data = await getSearchedGames(value);
      setSearchedGames(data);
      setSearchLoading(false);
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    if (!e.target.value) {
      setSearchedGames(undefined);
      setSearchLoading(false);
    } else {
      debounce(() => fetchData(e.target.value));
    }
  }

  return (
    <>
      <Search value={inputValue} onChange={(e) => handleChange(e)} loading={searchLoading} />
      {searchedGames !== undefined && inputValue && <SearchResults results={searchedGames} />}
      <Categories />
      <Games games={topGames} loading={gamesLoading} />
    </>
  );
}
export default Home;
