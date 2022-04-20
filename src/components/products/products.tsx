import useLoader from "@/helpers/useLoader";
import { RootState } from "@/redux";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import GameCard from "../home/games/gameCard";
import { Layout } from "../home/games/games.types";
import { Search } from "../search";
import Filters from "./filters";
import "./products.scss";

function Products() {
  const [search, setSearch] = useState<string>();
  const Loader = useLoader();
  const { isFilterLoading, games } = useSelector((state: RootState) => state.games);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const gamesArr = games.map((game) => <GameCard key={game.id} {...game} layout={Layout.Grid} />);

  return (
    <section>
      <div className="section-content products-page">
        <Filters search={search} />
        <div className="main">
          <Search value={search || ""} onChange={handleChange} />
          <div className="products-container">
            <Loader isLoading={isFilterLoading}>
              {gamesArr.length !== 0 ? gamesArr : <h3 style={{ marginBottom: "40px" }}>No games found</h3>}
            </Loader>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Products;
