import { useState } from "react";
import useLoader from "@/helpers/useLoader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { Layout } from "./games.types";
import list from "../../../assets/images/list.svg";
import grid from "../../../assets/images/grid.svg";
import GameCard from "./gameCard";
import styles from "./games.module.scss";

function Games() {
  const [layout, setLayout] = useState<Layout>(Layout.Grid);
  const Loader = useLoader();
  const { isTopLoading, games } = useSelector((state: RootState) => state.games);

  function changeLayout(option: Layout) {
    if (option === layout) return;
    setLayout(option);
  }

  const gamesArr = games.map((game) => <GameCard key={game.id} {...game} layout={layout} />);
  return (
    <section>
      <div className="section-content">
        <div className={styles.title}>
          <h2>Games</h2>
          <div className={styles.layout}>
            <button
              type="button"
              className={
                layout === Layout.Grid
                  ? `${styles.changeLayout} ${styles.grid} ${styles.activeLayout}`
                  : `${styles.changeLayout} ${styles.grid}`
              }
              aria-label="grid layout"
              onClick={() => changeLayout(Layout.Grid)}
            >
              <img src={grid} alt="grid" />
            </button>
            <button
              type="button"
              className={
                layout === Layout.List
                  ? `${styles.changeLayout} ${styles.list} ${styles.activeLayout}`
                  : `${styles.changeLayout} ${styles.list}`
              }
              aria-label="list layout"
              onClick={() => changeLayout(Layout.List)}
            >
              <img src={list} alt="list" />
            </button>
          </div>
        </div>
        <div className={layout === Layout.Grid ? `${styles.gamesGrid}` : `${styles.gamesList}`}>
          <Loader isLoading={isTopLoading}>
            {gamesArr.length !== 0 ? gamesArr : <h3 className="no-data">No games found</h3>}
          </Loader>
        </div>
      </div>
    </section>
  );
}

export default Games;
