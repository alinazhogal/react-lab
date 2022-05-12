import debounce from "@/helpers/debounce";
import { getFiltered } from "@/redux/actions/gamesAction";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import arrow from "../../assets/images/arrow-down.svg";

// eslint-disable-next-line react/require-default-props
function Filters({ search }: { search?: string }) {
  const { category } = useParams();
  const [filters, setFilters] = useState({
    platform: category,
    age: "All ages",
    genre: "All genres",
    sortCriteria: "recent",
    sortType: "asc",
  });
  const [isMobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname.split("/")[2] !== filters.platform)
      setFilters({ ...filters, platform: location.pathname.split("/")[2] });
  }, [location]);

  useEffect(() => {
    dispatch(getFiltered(filters.platform, filters.genre, filters.age, filters.sortCriteria, filters.sortType));
  }, [filters]);

  useEffect(() => {
    if (search !== undefined) {
      debounce(() =>
        dispatch(
          getFiltered(filters.platform, filters.genre, filters.age, filters.sortCriteria, filters.sortType, search)
        )
      );
    }
  }, [search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const ages = ["All ages", 3, 6, 12, 18];
  const genres = ["All genres", "Shooter", "Arcade", "Survive"];

  const agesFilter = ages.map((age) => (
    <label htmlFor={age.toString()} key={age}>
      <input
        type="radio"
        id={age.toString()}
        name="age"
        value={age.toString()}
        onChange={handleChange}
        checked={age.toString() === filters.age}
      />
      {age === "All ages" ? age : `${age}+`}
    </label>
  ));
  const genresFilter = genres.map((genre) => (
    <label htmlFor={genre} key={genre}>
      <input
        type="radio"
        id={genre}
        name="genre"
        value={genre}
        onChange={handleChange}
        checked={genre === filters.genre}
      />
      {genre}
    </label>
  ));

  return (
    <>
      <div
        className="filters-mobile"
        role="button"
        tabIndex={0}
        onClick={() => setMobileOpen(!isMobileOpen)}
        onKeyDown={() => setMobileOpen(!isMobileOpen)}
      >
        <h4>Filters</h4>
        <img src={arrow} alt="arrow" className={isMobileOpen ? "arrow-up" : ""} />
      </div>
      <div className={isMobileOpen ? "filters-container filters-open" : "filters-container"}>
        <h3>{category}</h3>
        <div className="sort-container">
          <h5>Sort</h5>
          <div className="sort">
            <span>Criteria</span>
            <select name="sortCriteria" id="criteria" onChange={handleChange}>
              <option value="recent">Recent</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>
          <div className="sort">
            <span>Type</span>
            <select name="sortType" id="type" onChange={handleChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <div className="filter">
          <h5>Age</h5>
          {agesFilter}
        </div>
        <div className="filter">
          <h5>Genres</h5>
          {genresFilter}
        </div>
      </div>
    </>
  );
}

export default memo(Filters);
