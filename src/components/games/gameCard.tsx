import { Game } from "../../api/games";
import "./games.scss";
import Button from "../../elements/button";
import stars from "../../assets/images/stars.svg";
import xbox from "../../assets/images/xbox.png";

function GameCard({ name, image, description, price }: Game) {
  return (
    <div className="game-card">
      <img src={image} alt={name} className="game-img" />
      <div className="game-info">
        <div className="main-info">
          <div className="name-rating">
            <h3>{name}</h3>
            <img src={stars} alt="rating" />
          </div>

          <div className="platform">
            <img src={xbox} alt="" />
          </div>
        </div>
        <p>{description}</p>
        <div className="price-info">
          <h4>${price}</h4>
          <Button title="Add to cart" onClick={() => alert("got product")} />
        </div>
      </div>
    </div>
  );
}

export default GameCard;
