/* eslint-disable react/require-default-props */
import { Platforms } from "@/components/home/games/games.types";
import Button from "@/elements/button";
import Input from "@/elements/input";
import { EditErrors, validateEdit } from "@/helpers/validate";
import { RootState } from "@/redux";
import { addGame, deleteGame, updateGame } from "@/redux/actions/gamesAction";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal";

function EditCardForm({
  id,
  onClose,
  action,
  link,
  date,
}: {
  id?: number;
  onClose: () => void;
  action: "add" | "edit";
  link?: string;
  date?: string;
}) {
  const { games } = useSelector((state: RootState) => state.games);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dispatch = useDispatch();

  const game = games.find((item) => item.id === id);

  const [cardValues, setCardValues] = useState({
    name: game?.name || "",
    image: game?.image || "",
    genre: game?.genre || "",
    price: game?.price || "",
    description: game?.description || "",
    age: game?.age || "All ages",
    platforms: game?.platforms || [],
  });
  const [editErrors, setEditErrors] = useState<EditErrors>({
    name: "",
    image: "",
    genre: "",
    price: "",
    description: "",
    platforms: "",
  });

  const isError = editErrors.name || editErrors.image || editErrors.genre || editErrors.price || editErrors.description;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCardValues({ ...cardValues, [name]: value });
  };

  const handlePlatformsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked)
      setCardValues({ ...cardValues, platforms: [...cardValues.platforms, e.target.value as Platforms] });
    else setCardValues({ ...cardValues, platforms: cardValues.platforms.filter((pl) => pl !== e.target.value) });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditErrors(validateEdit(e.target.name, e.target.value, editErrors));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditErrors({ ...editErrors, [e.target.name]: "" });
  };

  const handleDeleteClick = () => {
    if (action === "add") {
      onClose();
    } else setConfirmOpen(true);
  };

  const handleDeleteCard = () => {
    if (id) {
      dispatch(deleteGame(id));
      setConfirmOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cardValues.platforms.length) {
      setEditErrors({ ...editErrors, platforms: "Choose at least one platform" });
      return;
    }
    if (!isError) {
      if (action === "add") {
        dispatch(
          addGame({
            ...cardValues,
            price: Number(cardValues.price),
          })
        );
        onClose();
      }
      if (action === "edit") {
        if (date && link && id) {
          dispatch(updateGame({ ...cardValues, date, link, id, price: Number(cardValues.price) }));
        }
        onClose();
      }
    }
  };

  return (
    <div className="edit-form">
      <div className="image-preview">
        {cardValues.image ? <img src={cardValues.image} alt="Game" /> : <h4>No picture</h4>}
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          id="name"
          type="text"
          value={cardValues.name}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          errorMessage={editErrors.name}
        />
        <Input
          label="Image"
          id="image"
          type="text"
          value={cardValues.image}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          errorMessage={editErrors.image}
        />
        <Input
          label="Genre"
          id="genre"
          type="text"
          value={cardValues.genre}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          errorMessage={editErrors.genre}
        />
        <Input
          label="Price"
          id="price"
          type="text"
          value={cardValues.price.toString()}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          errorMessage={editErrors.price}
        />
        <div className="input-div">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={cardValues.description}
            required
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          <span>{editErrors.description}</span>
        </div>
        <div className="form-option">
          <span>Age</span>
          <select name="age" id="age" value={cardValues.age} onChange={handleChange}>
            <option value="All ages">All ages</option>
            <option value="3">3+</option>
            <option value="6">6+</option>
            <option value="12">12+</option>
            <option value="18">18+</option>
          </select>
        </div>
        <div className="checklist">
          <span>Platforms</span>
          <p>{editErrors.platforms}</p>
          <div className="form-option">
            <label htmlFor="pc">
              PC
              <input
                type="checkbox"
                value="pc"
                onChange={handlePlatformsChange}
                defaultChecked={cardValues.platforms.some((platform) => platform === "pc")}
              />
            </label>
            <label htmlFor="playstation">
              Playstation
              <input
                type="checkbox"
                value="playstation"
                onChange={handlePlatformsChange}
                defaultChecked={cardValues.platforms.some((platform) => platform === "playstation")}
              />
            </label>
            <label htmlFor="xbox">
              Xbox
              <input
                type="checkbox"
                value="xbox"
                onChange={handlePlatformsChange}
                defaultChecked={cardValues.platforms.some((platform) => platform === "xbox")}
              />
            </label>
          </div>
        </div>
        <div className="edit-buttons">
          <button type="button" className="secondary-button" onClick={handleDeleteClick}>
            Delete
          </button>
          <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} title="Are you sure?">
            <p className="confirm">Are you sure you want to delete game {game?.name}?</p>
            <div className="edit-buttons">
              <button type="button" className="secondary-button" onClick={() => setConfirmOpen(false)}>
                No
              </button>
              <Button title="Yes" onClick={handleDeleteCard} />
            </div>
          </Modal>
          <button type="submit" className="button-el">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCardForm;
