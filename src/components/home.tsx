import { getGames, Game } from "@/api/games";
import { useEffect, useState } from "react";
import Categories from "./categories/categories";
import Games from "./games/games";

function Home() {
  const [games, setGames] = useState<Game[]>([]);
  useEffect(() => {
    (async () => {
      const data = await getGames();
      setGames(data);
    })();
  }, []);
  return (
    <>
      <Categories />
      <Games games={games} />
    </>
  );
}
export default Home;
