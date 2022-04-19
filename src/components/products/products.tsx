import { RootState } from "@/redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GameCard from "../home/games/gameCard";
import { Layout } from "../home/games/games.types";
import Filters from "./filters";
import "./products.scss";

function Products() {
  const { category } = useParams();

  const { games } = useSelector((state: RootState) => state.games);

  const gamesArr = games.map((game) => <GameCard key={game.id} {...game} layout={Layout.Grid} />);

  return (
    <section>
      <div className="section-content products-page">
        <Filters category={category} />
        <div className="products">
          <div className="products-container">{gamesArr}</div>
        </div>
      </div>
    </section>
  );
}
export default Products;
