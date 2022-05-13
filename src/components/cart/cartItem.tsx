import { deleteCartItem, updateCartItem } from "@/redux/actions/cartActions";
import { CartItem } from "@/redux/types";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { Platforms } from "../home/games/games.types";

interface CartValues {
  amount: number | string;
  platform: Platforms;
}

function CartItem({ name, platforms, date, amount, price, selectedPlatform, image }: CartItem) {
  const [values, setValues] = useState<CartValues>({ amount, platform: selectedPlatform });
  const dispatch = useDispatch();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const updatedValues: CartValues = { ...values, platform: value as Platforms };
    setValues({ ...updatedValues });
    dispatch(updateCartItem({ name, ...updatedValues }));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let updatedValues: CartValues = { ...values, amount: Number(value) };
    if (Number(value) >= 1 && Number.isInteger(Number(value))) {
      updatedValues = { ...values, amount: Number(value) };
      setValues({ ...updatedValues });
    } else if (!value) {
      updatedValues = { ...values, amount: "" };
      setValues({ ...updatedValues });
      return;
    } else {
      updatedValues = { ...values, amount: 1 };
      setValues({ ...updatedValues });
    }
    dispatch(updateCartItem({ name, ...updatedValues }));
  };

  function handleDeleteItem() {
    dispatch(deleteCartItem(name));
  }

  return (
    <div className="table-row data-row">
      <div className="table-data" role="cell">
        <img src={image} alt="game" />
      </div>
      <div className="table-data" role="cell" aria-label="Name">
        {name}
      </div>
      <div className="table-data" role="cell" aria-label="Platform">
        <select name="platform" id="platform" onChange={handleSelectChange}>
          {platforms.map((pl) => (
            <option key={pl} value={pl}>
              {pl}
            </option>
          ))}
        </select>
      </div>
      <div className="table-data" role="cell" aria-label="Order date">
        {date}
      </div>
      <div className="table-data" role="cell" aria-label="Amount">
        <input
          type="number"
          name="amount"
          min="1"
          value={values.amount}
          onChange={handleAmountChange}
          required
          title="Enter whole positive number"
        />
      </div>
      <div className="table-data" role="cell" aria-label="Price">
        ${price}
      </div>
      <div className="table-data" role="cell">
        <button type="button" aria-label="Delete item" onClick={handleDeleteItem}>
          Delete
        </button>
      </div>
    </div>
  );
}
export default memo(CartItem);
