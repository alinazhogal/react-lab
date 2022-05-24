import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { getFiltered } from "../../redux/actions/gamesAction";
import debounce from "../../helpers/debounce";
import useIsMount from "../../helpers/useIsMount";
import { RootState } from "../../redux";
import arrow from "../../assets/images/arrow-down.svg";
import styles from "./products.module.scss";

const timeOfTwoHours = 2 * 60 * 60 * 1000;

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
  const timestamp = useSelector((state: RootState) => state.games.timestamp);
  const isMount = useIsMount();

  useEffect(() => {
    if (location.pathname.split("/")[2] !== filters.platform)
      setFilters({ ...filters, platform: location.pathname.split("/")[2] });
  }, [location]);

  useEffect(() => {
    if (!isMount) {
      dispatch(getFiltered(filters.platform, filters.genre, filters.age, filters.sortCriteria, filters.sortType));
    }
  }, [filters]);

  useEffect(() => {
    if (timestamp + timeOfTwoHours < Date.now()) {
      dispatch(getFiltered(filters.platform, filters.genre, filters.age, filters.sortCriteria, filters.sortType));
    }
  }, []);

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
        className={styles.filtersMobile}
        role="button"
        tabIndex={0}
        onClick={() => setMobileOpen(!isMobileOpen)}
        onKeyDown={() => setMobileOpen(!isMobileOpen)}
      >
        <h4>Filters</h4>
        <img src={arrow} alt="arrow" className={isMobileOpen ? `${styles.arrowUp}` : ""} />
      </div>
      <div className={isMobileOpen ? `${styles.filtersContainer} ${styles.filtersOpen}` : `${styles.filtersContainer}`}>
        <h3>{category}</h3>
        <div className={styles.sortContainer}>
          <h5>Sort</h5>
          <div className={styles.sort}>
            <span>Criteria</span>
            <select name="sortCriteria" id="criteria" onChange={handleChange}>
              <option value="recent">Recent</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>
          <div className={styles.sort}>
            <span>Type</span>
            <select name="sortType" id="type" onChange={handleChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <div className={styles.filter}>
          <h5>Age</h5>
          {agesFilter}
        </div>
        <div className={styles.filter}>
          <h5>Genres</h5>
          {genresFilter}
        </div>
      </div>
    </>
  );
}

export default Filters;
