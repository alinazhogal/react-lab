import "./search.scss";
import searchIcon from "../assets/images/search.svg";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}

function Search({ value, onChange, loading }: Props) {
  return (
    <div className="search-div">
      {!loading && <img src={searchIcon} alt="" />}
      {loading && <div className="lds-dual-ring" />}
      <input type="search" placeholder="Search..." className="search" value={value} onChange={onChange} />
    </div>
  );
}

export default Search;
