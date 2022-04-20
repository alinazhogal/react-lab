import { RootState } from "@/redux";
import { useState } from "react";
import { useSelector } from "react-redux";

import GameCard from "../home/games/gameCard";
import { Layout } from "../home/games/games.types";
import { Search } from "../search";
import Filters from "./filters";
import "./products.scss";

function Products() {
  const [search, setSearch] = useState<string>("");
  const { games } = useSelector((state: RootState) => state.games);

  const gamesArr = games.map((game) => <GameCard key={game.id} {...game} layout={Layout.Grid} />);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <section>
      <div className="section-content products-page">
        <Filters search={search} />
        <div className="main">
          <Search value={search} onChange={handleChange} />
          <div className="products">
            <div className="products-container">{gamesArr}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Products;
