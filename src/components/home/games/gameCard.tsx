import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux";
import { addCartItem } from "@/redux/actions/cartActions";
import { useState } from "react";
import Modal from "@/components/modal/modal";
import EditCardForm from "@/components/modal/forms/editCard";
import { Game, Layout } from "./games.types";
import styles from "./games.module.scss";
import stars from "../../../assets/images/stars.svg";
import xbox from "../../../assets/images/xbox.png";
import pc from "../../../assets/images/desktop-computer.png";
import playstation from "../../../assets/images/playstation.png";

function GameCard({
  id,
  name,
  image,
  description,
  price,
  link,
  platforms,
  age,
  layout,
  date,
}: Game & { layout: Layout }) {
  const [editOpen, setEditOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuth, role } = useSelector((state: RootState) => state.auth);
  const cart = useSelector((state: RootState) => state.cart);

  const isAdded = cart.some((item) => item.name === name) && isAuth;
  const [disabled, setDisabled] = useState(isAdded);

  const isAdmin = role === "admin";

  const click = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isAuth) {
      dispatch(addCartItem({ name, platforms, price, id, image }));
      setDisabled(true);
    } else alert("not authorised");
  };

  const platformID = {
    xbox,
    playstation,
    pc,
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditOpen(true);
  };

  if (layout === Layout.List)
    return (
      <a href={link} target="_blank" rel="noreferrer">
        <div className={styles.gameCardList}>
          <img src={image} alt={name} className={styles.gameImg} />
          <div className={styles.gameInfo}>
            <div className={styles.mainInfo}>
              <div className={styles.nameRating}>
                <h3>{name}</h3>
                <img src={stars} alt="rating" />
              </div>
              <div className={styles.platform}>
                {platforms.map((item) => (
                  <img src={platformID[item]} alt={item} key={item} />
                ))}
              </div>
            </div>
            <p>{description}</p>
            <div className={styles.priceInfo}>
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
    <>
      <a href={link} target="_blank" rel="noreferrer">
        <div className={styles.gameCardGrid}>
          <img src={image} alt={name} className={styles.gameImg} />
          <div className={styles.platform}>
            {platforms.map((item) => (
              <img src={platformID[item]} alt={item} key={item} />
            ))}
          </div>
          {isAdmin && (
            <button type="button" className={styles.adminEdit} onClick={handleEdit}>
              Edit
            </button>
          )}
          <div className={styles.gameInfo}>
            <div className={styles.mainInfo}>
              <div className={styles.nameRating}>
                <h3>{name}</h3>
                <img src={stars} alt="rating" />
                <span>{age === "All ages" ? "All ages" : `${age}+`}</span>
              </div>
            </div>
            <div className={styles.priceInfo}>
              <h4>${price}</h4>
              <button type="button" className={disabled ? "button-el disabled" : "button-el"} onClick={click}>
                {disabled ? "Added" : "Add to cart"}
              </button>
            </div>
          </div>
        </div>
      </a>
      <Modal title="Edit card" isOpen={editOpen} onClose={() => setEditOpen(false)}>
        <EditCardForm onClose={() => setEditOpen(false)} id={id} action="edit" link={link} date={date} />
      </Modal>
    </>
  );
}

export default GameCard;
