import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { removeItemFromStorage, SavableKeys } from "@/helpers/storage";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/redux/actions/authActions";
import { RootState } from "@/redux";
import setSignInOpen from "@/redux/actions/modalActions";
import pageLinks from "../../routesLinks";
import arrow from "../../assets/images/arrow-down.svg";
import profile from "../../assets/images/account.svg";
import cart from "../../assets/images/cart.svg";
import logout from "../../assets/images/log-out.svg";
import Modal from "../modal/modal";
import SignInForm from "../modal/forms/signInForm";
import SignUpForm from "../modal/forms/signUpForm";
import MobileMenu from "./mobileMenu";

export default function NavBar() {
  const [isSignUpOpen, setSignUpOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isSignInOpen = useSelector((state: RootState) => state.modal.isOpen);
  const user = useSelector((state: RootState) => state.auth);

  function handleLogOut() {
    dispatch(logOut());
    removeItemFromStorage(SavableKeys.User);
    navigate("/home");
  }

  function onSignInOpen() {
    dispatch(setSignInOpen(true));
  }

  function onSignInClose() {
    dispatch(setSignInOpen(false));
  }

  return (
    <nav>
      <ul className="navbar">
        <li className="nav-home">
          <NavLink to={pageLinks.home} className={({ isActive }) => (isActive ? "active-link" : "")}>
            Home
          </NavLink>
        </li>
        <li className="nav-prod">
          <div className="dropdown">
            <NavLink
              to={pageLinks.products}
              className={({ isActive }) => (isActive ? "active-link dropbtn" : "dropbtn")}
            >
              Products
              <img src={arrow} alt="arrow" className="arrow" />
            </NavLink>
            <div className="dropdown-content">
              <NavLink to={`${pageLinks.products}/pc`} className="product-link">
                PC
              </NavLink>
              <NavLink to={`${pageLinks.products}/playstation`} className="product-link">
                Playstation 5
              </NavLink>
              <NavLink to={`${pageLinks.products}/xbox`} className="product-link">
                Xbox One
              </NavLink>
            </div>
          </div>
        </li>
        <li className="nav-about">
          <NavLink to={pageLinks.about} className={({ isActive }) => (isActive ? "active-link " : "")}>
            About
          </NavLink>
        </li>

        {!user.isAuth && (
          <>
            <li>
              <button type="button" onClick={onSignInOpen} className="nav-button">
                Sign in
              </button>
            </li>
            <Modal isOpen={isSignInOpen} onClose={() => onSignInClose()} title="Authorization">
              <SignInForm />
            </Modal>
            <li>
              <button type="button" onClick={() => setSignUpOpen(true)} className="nav-button">
                Sign up
              </button>
            </li>
            <Modal isOpen={isSignUpOpen} onClose={() => setSignUpOpen(false)} title="Registration">
              <SignUpForm onClose={() => setSignUpOpen(false)} />
            </Modal>
          </>
        )}

        {user.isAuth && (
          <>
            <li>
              <NavLink to={pageLinks.profile}>
                <button type="button" className="auth-button" aria-label="profile page">
                  <img src={profile} alt="profile" />
                  {user.username}
                </button>
              </NavLink>
            </li>
            <li>
              <button type="button" className="auth-button" aria-label="cart page">
                <img src={cart} alt="cart" />0
              </button>
            </li>
            <li>
              <button type="button" className="auth-button" onClick={handleLogOut} aria-label="log out">
                <img src={logout} alt="logout" />
              </button>
            </li>
          </>
        )}
        <MobileMenu />
      </ul>
    </nav>
  );
}
