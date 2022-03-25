import "./search.scss";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Search({ value, onChange }: Props) {
  return (
    <div className="search-div">
      <img src="" alt="" />
      <input type="search" placeholder="Search..." className="search" value={value} onChange={onChange} />
    </div>
  );
}

export default Search;
