import { Game } from "./games.types";
import GameCard from "./gameCard";

interface GamesProps {
  games: Game[];
  loading: boolean;
}

function Games({ games, loading }: GamesProps) {
  const gamesArr = games.map((game) => (
    <GameCard
      key={game.id}
      id={game.id}
      name={game.name}
      image={game.image}
      description={game.description}
      price={game.price}
      date={game.date}
      link={game.link}
    />
  ));
  return (
    <section>
      <div className="section-container">
        <h2>Games</h2>
        {loading && <div className="lds-dual-ring" />}
        {!loading && (
          <div className="games">
            {gamesArr.length ? gamesArr : <h3 style={{ marginBottom: "40px" }}>No games found</h3>}{" "}
          </div>
        )}
      </div>
    </section>
  );
}

export default Games;
