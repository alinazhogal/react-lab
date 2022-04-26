import { RootState } from "@/redux";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/elements/button";
import "./cart.scss";
import { useEffect, useState } from "react";
import { buyCart, clearCart, getCart } from "@/redux/actions/cartActions";
import CartItem from "./cartItem";
import Modal from "../modal/modal";

function Cart() {
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const login = useSelector((state: RootState) => state.auth.username);

  const totalAmount = cart.reduce((acc, cur) => acc + Number(cur.amount), 0);
  const totalPrice = cart.reduce((acc, cur) => acc + cur.price, 0);

  const cartArr = cart.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      selectedPlatform={item.selectedPlatform}
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

  function handleBuy() {
    dispatch(buyCart(cart));
    setModalOpen(true);
  }

  return (
    <section>
      {cart.length !== 0 && (
        <div className="section-content" id="cart-page">
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
            <Button title="Buy" onClick={() => handleBuy()} />
          </div>
        </div>
      )}
      {cart.length === 0 && (
        <div className="default-page">
          <h2>No products in cart</h2>
        </div>
      )}
      <Modal title="Ordered successfully" isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h5>You have successfully purchase products</h5>
        <Button title="Thanks!" onClick={() => setModalOpen(false)} />
      </Modal>
    </section>
  );
}

export default Cart;
