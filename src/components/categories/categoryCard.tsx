import PrivateLink from "../header/privateLink";
import "./categories.scss";

interface CategoryProps {
  title: string;
  link: string;
  img: string;
}

function CategoryCard({ title, img, link }: CategoryProps) {
  return (
    <PrivateLink to={link} passiveCn="">
      <div className="category">
        <img src={img} alt="" />
        <h4>{title}</h4>
      </div>
    </PrivateLink>
  );
}

export default CategoryCard;
