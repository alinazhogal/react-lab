import { Game } from "../../api/games";
import GameCard from "./gameCard";

interface Props {
  games: Game[];
}

function Games({ games }: Props) {
  const gamesArr = games.map((game) => (
    <GameCard
      key={game.id}
      id={game.id}
      name={game.name}
      image={game.image}
      description={game.description}
      price={game.price}
      date={game.date}
    />
  ));
  return (
    <section>
      <div className="section-container">
        <h2>Games</h2>
        <div className="games" />
        {gamesArr}
      </div>
    </section>
  );
}

export default Games;
