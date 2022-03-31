import { Game } from "../components/games/games.types";
import "./search.scss";
import searchIcon from "../assets/images/search.svg";
import stars from "../assets/images/stars.svg";
import arrowRight from "../assets/images/arrow-right.svg";

interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}

export function Search({ value, onChange, loading }: SearchProps) {
  return (
    <div className="search-div">
      {!loading && <img src={searchIcon} alt="" />}
      {loading && <div className="lds-dual-ring" />}
      <input type="search" placeholder="Search..." className="search" value={value} onChange={onChange} />
    </div>
  );
}

function SearchCard({ image, link, name, price }: Game) {
  return (
    <a href={link}>
      <div className="search-card">
        <img src={image} alt={name} />
        <div className="search-game-name">
          <h5>{name}</h5>
          <img src={stars} alt="rating" />
        </div>
        <span>${price}</span>
        <img src={arrowRight} alt="arrow right" className="arrow" />
      </div>
    </a>
  );
}

interface searchResultsProps {
  results: Game[];
}

export function SearchResults({ results }: searchResultsProps) {
  const searchResultsArr = results.map((game) => <SearchCard key={game.id} {...game} />);

  return (
    <div className="results">
      {searchResultsArr.length ? searchResultsArr : <h3 style={{ marginTop: "40px" }}>No games found</h3>}
    </div>
  );
}
