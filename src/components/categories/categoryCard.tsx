import { NavLink } from "react-router-dom";
import "./categories.scss";

interface CategoryProps {
  title: string;
  link: string;
  img: string;
}

function CategoryCard({ title, img, link }: CategoryProps) {
  return (
    <NavLink to={link}>
      <div className="category">
        <img src={img} alt="" />
        <h4>{title}</h4>
      </div>
    </NavLink>
  );
}

export default CategoryCard;
