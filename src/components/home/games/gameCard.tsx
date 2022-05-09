import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux";
import { addCartItem } from "@/redux/actions/cartActions";
import { useState } from "react";
import { Game, Layout } from "./games.types";
import "./games.scss";
import stars from "../../../assets/images/stars.svg";
import xbox from "../../../assets/images/xbox.png";
import pc from "../../../assets/images/desktop-computer.png";
import playstation from "../../../assets/images/playstation.png";

function GameCard({ id, name, image, description, price, link, platforms, age, layout }: Game & { layout: Layout }) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth);
  const cart = useSelector((state: RootState) => state.cart);
  const isAdded = cart.some((item) => item.name === name) && user.isAuth;
  const [disabled, setDisabled] = useState(isAdded);

  function click(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (user.isAuth) {
      dispatch(addCartItem({ name, platforms, price, id, image }));
      setDisabled(true);
    } else alert("not authorised");
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
              <button type="button" className={disabled ? "button-el disabled" : "button-el"} onClick={click}>
                {disabled ? "Added" : "Add to cart"}
              </button>
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
            <button type="button" className={disabled ? "button-el disabled" : "button-el"} onClick={click}>
              {disabled ? "Added" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </a>
  );
}

export default GameCard;
