import { Game, Layout } from "./games.types";
import "./games.scss";
import Button from "../../../elements/button";
import stars from "../../../assets/images/stars.svg";
import xbox from "../../../assets/images/xbox.png";
import pc from "../../../assets/images/desktop-computer.png";
import playstation from "../../../assets/images/playstation.png";

function GameCard({ name, image, description, price, link, platforms, age, layout }: Game & { layout: Layout }) {
  function click(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    alert("got product");
  }

  const platformID = {
    xbox,
    playstation,
    pc,
  };

  if (layout === Layout.List)
    return (
      <a href={link} target="_blank" rel="noreferrer">
        <div className="game-card-list">
          <img src={image} alt={name} className="game-img" />
          <div className="game-info">
            <div className="main-info">
              <div className="name-rating">
                <h3>{name}</h3>
                <img src={stars} alt="rating" />
              </div>
              <div className="platform">
                {platforms.map((item) => (
                  <img src={platformID[item]} alt={item} key={item} />
                ))}
              </div>
            </div>
            <p>{description}</p>
            <div className="price-info">
              <h4>${price}</h4>
              <span>{age}+</span>
              <Button title="Add to cart" onClick={(e) => click(e)} />
            </div>
          </div>
        </div>
      </a>
    );
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <div className="game-card-grid">
        <img src={image} alt={name} className="game-img" />
        <div className="platform">
          {platforms.map((item) => (
            <img src={platformID[item]} alt={item} key={item} />
          ))}
        </div>
        <div className="game-info">
          <div className="main-info">
            <div className="name-rating">
              <h3>{name}</h3>
              <img src={stars} alt="rating" />
              <span>{age}+</span>
            </div>
          </div>
          <div className="price-info">
            <h4>${price}</h4>
            <Button title="Add to cart" onClick={(e) => click(e)} />
          </div>
        </div>
      </div>
    </a>
  );
}

export default GameCard;
