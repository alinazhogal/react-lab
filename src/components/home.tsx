import { getTopGames, getSearchedGames, Game } from "@/api/games";
import Search from "@/elements/search";
import { useEffect, useState } from "react";
import debounce from "../helpers/debounce";
import Categories from "./categories/categories";
import Games from "./games/games";

function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [games, setGames] = useState<Game[]>([]);

  const fetchData = async (value?: string) => {
    setLoading(true);
    const data = !value ? await getTopGames() : await getSearchedGames(value);
    setGames(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    debounce(() => fetchData(e.target.value));
  }

  return (
    <>
      <Search value={inputValue} onChange={(e) => handleChange(e)} loading={loading} />
      <Categories />
      <Games games={games} />
    </>
  );
}
export default Home;
