import { RootState } from "@/redux";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/elements/button";
import "./cart.scss";
import { useEffect } from "react";
import { clearCart, getCart } from "@/redux/actions/cartActions";
import CartItem from "./cartItem";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const login = useSelector((state: RootState) => state.auth.username);

  // eslint-disable-next-line no-unsafe-optional-chaining
  const totalAmount = cart.reduce((acc, cur) => acc + cur?.amount, 0);
  // eslint-disable-next-line no-unsafe-optional-chaining
  const totalPrice = cart.reduce((acc, cur) => acc + cur?.price, 0);

  const cartArr = cart.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      platforms={item.platforms}
      date={item.date}
      amount={item.amount}
      price={item.price}
      id={item.id}
    />
  ));

  useEffect(() => {
    dispatch(getCart(login));
  }, []);

  function handleClear() {
    dispatch(clearCart(login));
  }

  return (
    <section>
      <div className="section-content cart-page">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Platform</th>
              <th>Order date</th>
              <th>Amount</th>
              <th>Price($)</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>{cartArr}</tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>{totalAmount}</th>
              <th>${totalPrice}</th>
              <th>&nbsp;</th>
            </tr>
          </tfoot>
        </table>
        <div className="cart-buttons">
          <button type="button" className="secondary-button" onClick={handleClear}>
            Clear all
          </button>
          <Button title="Buy" />
        </div>
      </div>
    </section>
  );
}

export default Cart;
