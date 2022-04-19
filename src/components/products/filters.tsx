function Filters({ category }: { category: string | undefined }) {
  const ages = ["All ages", 3, 6, 12, 18];
  const genres = ["All genres", "Shooter", "Arcade", "Survive"];

  const agesFilter = ages.map((age) => (
    <label htmlFor={age.toString()} key={age}>
      <input type="radio" id={age.toString()} name="age" value={age.toString()} />
      {age === "All ages" ? age : `${age}+`}
    </label>
  ));
  const genresFilter = genres.map((genre) => (
    <label htmlFor={genre} key={genre}>
      <input type="radio" id={genre} name="genre" value={genre} />
      {genre}
    </label>
  ));

  return (
    <div className="filters-container">
      <h3>{category}</h3>
      <div className="sort-container">
        <h5>Sort</h5>
        <div className="sort">
          <span>Criteria</span>
          <select name="criteria" id="criteria">
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div className="sort">
          <span>Type</span>
          <select name="type" id="type">
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
  );
}

export default Filters;
