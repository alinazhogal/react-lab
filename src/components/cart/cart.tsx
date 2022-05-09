import { RootState } from "@/redux";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/elements/button";
import "./cart.scss";
import { useState } from "react";
import { buyCart, clearCart } from "@/redux/actions/cartActions";
import CartItem from "./cartItem";
import Modal from "../modal/modal";

function Cart() {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isCheckModalOpen, setCheckModalOpen] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const login = useSelector((state: RootState) => state.auth.username);

  const totalAmount = cart.reduce((acc, cur) => acc + Number(cur.amount), 0);
  const totalPrice = cart.reduce((acc, cur) => acc + Number(cur.price), 0).toFixed(2);

  const cartArr = cart.map((item) => (
    <CartItem
      key={item.id}
      image={item.image}
      name={item.name}
      selectedPlatform={item.selectedPlatform}
      platforms={item.platforms}
      date={item.date}
      amount={item.amount}
      price={item.price}
      id={item.id}
    />
  ));

  const orderArr = cart.map((item) => (
    <div className="check-cart-item" key={item.id}>
      <p>
        {item.name} on {item.selectedPlatform} in amount of {item.amount} for ${item.price}
      </p>
    </div>
  ));

  function handleClear() {
    dispatch(clearCart(login));
  }

  function handleBuy() {
    dispatch(buyCart(cart));
    setCheckModalOpen(false);
    setConfirmModalOpen(true);
  }

  return (
    <section>
      {cart.length !== 0 && (
        <div className="section-content" id="cart-page">
          <div className="table" role="table">
            <div className="table-row header" role="rowgroup">
              <div className="table-data" role="columnheader">
                &nbsp;
              </div>
              <div className="table-data" role="columnheader">
                Name
              </div>
              <div className="table-data" role="columnheader" aria-label="Platform">
                Platform
              </div>
              <div className="table-data" role="columnheader" aria-label="Order date">
                Order date
              </div>
              <div className="table-data" role="columnheader">
                Amount
              </div>
              <div className="table-data" role="columnheader">
                Price
              </div>
              <div className="table-data" role="columnheader">
                &nbsp;
              </div>
            </div>
            {cartArr}
            <div className="table-row footer" role="rowgroup">
              <div className="table-data" role="columnheader">
                Total
              </div>
              <div className="table-data" role="columnheader">
                &nbsp;
              </div>
              <div className="table-data" role="columnheader">
                &nbsp;
              </div>
              <div className="table-data" role="columnheader">
                &nbsp;
              </div>
              <div className="table-data" role="columnheader">
                {totalAmount}
              </div>
              <div className="table-data" role="columnheader">
                ${totalPrice}
              </div>
              <div className="table-data" role="columnheader">
                &nbsp;
              </div>
            </div>
          </div>
          <div className="cart-buttons">
            <button type="button" className="secondary-button" onClick={handleClear}>
              Clear all
            </button>
            <Button title="Buy" onClick={() => setCheckModalOpen(true)} />
          </div>
        </div>
      )}
      {cart.length === 0 && (
        <div className="default-page">
          <h2>No products in cart</h2>
        </div>
      )}
      <Modal title="Check your order" isOpen={isCheckModalOpen} onClose={() => setCheckModalOpen(false)}>
        <h5>Your order is:</h5>
        {orderArr}
        <h5>Total amount: {totalAmount} </h5>
        <h5>Total price: ${totalPrice} </h5>
        <div className="modal-buttons">
          <button type="button" className="secondary-button" onClick={() => setCheckModalOpen(false)}>
            Cancel
          </button>
          <Button title="Buy" onClick={() => handleBuy()} />
        </div>
      </Modal>
      <Modal title="Ordered successfully" isOpen={isConfirmModalOpen} onClose={() => setConfirmModalOpen(false)}>
        <h5>You have successfully purchase products</h5>
        <Button title="Thanks!" onClick={() => setConfirmModalOpen(false)} />
      </Modal>
    </section>
  );
}

export default Cart;
