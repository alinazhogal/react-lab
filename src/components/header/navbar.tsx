import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { removeItemFromStorage, SavableKeys } from "@/helpers/storage";
import { AuthContext } from "@/context";
import pageLinks from "../../routesLinks";
import arrow from "../../assets/images/arrow-down.svg";
import profile from "../../assets/images/account.svg";
import cart from "../../assets/images/cart.svg";
import logout from "../../assets/images/log-out.svg";
import Modal from "../modal/modal";
import SignInForm from "../modal/forms/signInForm";
import SignUpForm from "../modal/forms/signUpForm";
import MobileMenu from "./mobileMenu";

export interface AuthProps {
  logIn: (arg0: string) => void;
  username: string;
  isAuth: boolean;
  logOut: () => void;
  signInOpen: boolean | undefined;
  setSignInOpen: (arg0: boolean) => void;
}

export function NavBar() {
  const [isSignUpOpen, setSignUpOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);

  function handleLogOut() {
    dispatch({ type: "setIsAuth", payload: false });
    removeItemFromStorage(SavableKeys.User);
    navigate("/home");
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

        {!state.isAuth && (
          <>
            <li>
              <button
                type="button"
                onClick={() => dispatch({ type: "setSignInOpen", payload: true })}
                className="nav-button"
              >
                Sign in
              </button>
            </li>
            <Modal
              isOpen={state.signInOpen}
              onClose={() => dispatch({ type: "setSignInOpen", payload: false })}
              title="Authorization"
            >
              <SignInForm onClose={() => dispatch({ type: "setSignInOpen", payload: false })} />
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

        {state.isAuth && (
          <>
            <li>
              <NavLink to={pageLinks.profile}>
                <button type="button" className="auth-button" aria-label="profile page">
                  <img src={profile} alt="profile" />
                  {state.userName}
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
