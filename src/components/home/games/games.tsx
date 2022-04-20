import { useState } from "react";
import Loader from "@/elements/loader";
import { Game, Layout } from "./games.types";
// import GameCard from "./gameCard";
import list from "../../../assets/images/list.svg";
import grid from "../../../assets/images/grid.svg";
import GameCard from "./gameCard";

interface GamesProps {
  games: Game[];
  // eslint-disable-next-line react/require-default-props
  loading?: boolean;
}

function Games({ games, loading }: GamesProps) {
  const [layout, setLayout] = useState<Layout>(Layout.Grid);

  function changeLayout(option: Layout) {
    if (option === layout) return;

    setLayout(option);
  }

  const gamesArr = games.map((game) => <GameCard key={game.id} {...game} layout={layout} />);
  return (
    <section>
      <div className="section-content">
        <div className="section-title">
          <h2>Games</h2>
          <div className="layout">
            <button
              type="button"
              className={layout === Layout.Grid ? "change-layout grid active-layout" : "change-layout grid"}
              aria-label="grid layout"
              onClick={() => changeLayout(Layout.Grid)}
            >
              <img src={grid} alt="grid" />
            </button>
            <button
              type="button"
              className={layout === Layout.List ? "change-layout list active-layout" : "change-layout list"}
              aria-label="list layout"
              onClick={() => changeLayout(Layout.List)}
            >
              <img src={list} alt="list" />
            </button>
          </div>
        </div>
        {loading && <Loader />}
        {!loading && (
          <div className={layout === Layout.Grid ? "games-grid" : "games-list"}>
            {gamesArr.length !== 0 ? gamesArr : <h3 style={{ marginBottom: "40px" }}>No games found</h3>}
          </div>
        )}
      </div>
    </section>
  );
}

export default Games;
