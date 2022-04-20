import Loader from "@/elements/loader";
import React, { lazy, useState } from "react";
import { Search } from "../search";
import Filters from "./filters";
import "./products.scss";

const GamesContainer = lazy(() => import("../home/games/gamesContainer"));

function Products() {
  const [search, setSearch] = useState<string>("");
  // const { games } = useSelector((state: RootState) => state.games);

  // const gamesArr = games.map((game) => <GameCard key={game.id} {...game} layout={Layout.Grid} />);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <section>
      <div className="section-content products-page">
        <Filters search={search} />
        <div className="main">
          <Search value={search} onChange={handleChange} />
          <div className="products-container">
            <React.Suspense fallback={<Loader />}>
              <GamesContainer />
            </React.Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Products;
