import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux";
import { addCartItem } from "@/redux/actions/cartActions";
import { useState } from "react";
import Modal from "@/components/modal/modal";
import EditCardForm from "@/components/modal/forms/editCard";
import { Game, Layout } from "./games.types";
import "./games.scss";
import Button from "../../../elements/button";
import stars from "../../../assets/images/stars.svg";
import xbox from "../../../assets/images/xbox.png";
import pc from "../../../assets/images/desktop-computer.png";
import playstation from "../../../assets/images/playstation.png";

function GameCard({ id, name, image, description, price, link, platforms, age, layout }: Game & { layout: Layout }) {
  const [editOpen, setEditOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuth, role } = useSelector((state: RootState) => state.auth);

  const isAdmin = role === "admin";
  function click(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (isAuth) {
      dispatch(addCartItem({ name, platforms, price, id }));
    } else alert("not authorised");
  }

  const platformID = {
    xbox,
    playstation,
    pc,
  };

  function handleEdit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setEditOpen(true);
  }

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
              <span>{age === "All ages" ? "All ages" : `${age}+`}</span>
              <Button title="Add to cart" onClick={(e) => click(e)} />
            </div>
          </div>
        </div>
      </a>
    );
  return (
    <>
      <a href={link} target="_blank" rel="noreferrer">
        <div className="game-card-grid">
          <img src={image} alt={name} className="game-img" />
          <div className="platform">
            {platforms.map((item) => (
              <img src={platformID[item]} alt={item} key={item} />
            ))}
          </div>
          {isAdmin && (
            <button type="button" className="admin-edit" onClick={handleEdit}>
              Edit
            </button>
          )}
          <div className="game-info">
            <div className="main-info">
              <div className="name-rating">
                <h3>{name}</h3>
                <img src={stars} alt="rating" />
                <span>{age === "All ages" ? "All ages" : `${age}+`}</span>
              </div>
            </div>
            <div className="price-info">
              <h4>${price}</h4>
              <Button title="Add to cart" onClick={(e) => click(e)} />
            </div>
          </div>
        </div>
      </a>
      <Modal title="Edit card" isOpen={editOpen} onClose={() => setEditOpen(false)}>
        <EditCardForm onClose={() => setEditOpen(false)} id={id} action="edit" />
      </Modal>
    </>
  );
}

export default GameCard;
