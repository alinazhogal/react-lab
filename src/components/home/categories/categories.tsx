import xbox from "../../../assets/images/xbox.png";
import playstation from "../../../assets/images/playstation.png";
import desktop from "../../../assets/images/desktop-computer.png";
import CategoryCard from "./categoryCard";
import pageLinks from "../../../routesLinks";
import styles from "./categories.module.scss";

function Categories() {
  return (
    <section>
      <div className="section-content">
        <h2>Categories</h2>
        <div className={styles.categories}>
          <CategoryCard title="PC" img={desktop} link={`${pageLinks.products}/pc`} />
          <CategoryCard title="Playstation 5" img={playstation} link={`${pageLinks.products}/playstation`} />
          <CategoryCard title="Xbox One" img={xbox} link={`${pageLinks.products}/xbox`} />
        </div>
      </div>
    </section>
  );
}

export default Categories;
