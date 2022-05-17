import { Game } from "../components/home/games/games.types";
import search from "./search.module.scss";
import searchIcon from "../assets/images/search.svg";
import stars from "../assets/images/stars.svg";
import arrowRight from "../assets/images/arrow-right.svg";

interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line react/require-default-props
  loading?: boolean;
  // eslint-disable-next-line react/require-default-props
  styleAdd?: string;
}

export function Search({ value, onChange, loading, styleAdd }: SearchProps) {
  return (
    <div className={styleAdd ? `${search.searchDiv} ${search[`${styleAdd}`]}` : `${search.searchDiv}`}>
      {!loading && <img src={searchIcon} alt="" />}
      {loading && <div className={search["lds-dual-ring"]} />}
      <input type="search" placeholder="Search..." className={search.search} value={value} onChange={onChange} />
    </div>
  );
}

function SearchCard({ image, link, name, price }: Game) {
  return (
    <a href={link}>
      <div className={search.searchCard}>
        <img src={image} alt={name} />
        <div className={search.searchGameName}>
          <h5>{name}</h5>
          <img src={stars} alt="rating" />
        </div>
        <span>${price}</span>
        <img src={arrowRight} alt="arrow right" className={search.arrow} />
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
    <div className={search.results}>
      {searchResultsArr.length ? searchResultsArr : <h3 className="no-data">No games found</h3>}
    </div>
  );
}
