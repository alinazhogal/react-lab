import { deleteCartItem } from "@/redux/actions/cartActions";
import { CartItem } from "@/redux/types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import close from "../../assets/images/close.svg";

function CartItem({ name, platforms, date, amount, price }: CartItem) {
  const [values, setValues] = useState({ amount, platform: platforms[0] });
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name: eventName, value } = e.target;
    setValues({ ...values, [eventName]: value });
  };

  function handleDeleteItem() {
    dispatch(deleteCartItem(name));
  }

  return (
    <tr>
      <td aria-label="Name">{name}</td>
      <td aria-label="Platform">
        <select name="platform" id="platform" onChange={handleChange}>
          {platforms.map((pl) => (
            <option key={pl} value={pl}>
              {pl}
            </option>
          ))}
        </select>
      </td>
      <td aria-label="Order date">{date}</td>
      <td aria-label="Amount">
        <input type="number" name="amount" value={values.amount} onChange={handleChange} />
      </td>
      <td aria-label="Price">${price}</td>
      <td aria-label=" ">
        <button type="button" aria-label="Delete item" onClick={handleDeleteItem}>
          <img src={close} alt="delete" />
        </button>
      </td>
    </tr>
  );
}
export default CartItem;
