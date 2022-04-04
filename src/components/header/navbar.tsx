import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import pageLinks from "../../routesLinks";
import arrow from "../../assets/images/arrow-down.svg";
import profile from "../../assets/images/account.svg";
import cart from "../../assets/images/cart.svg";
import logout from "../../assets/images/log-out.svg";
import Modal from "../modal/modal";
import SignInForm from "../forms/signInForm";
import SignUpForm from "../forms/signUpForm";

export interface AuthProps {
  auth: (arg0: string) => void;
  username: string;
  isAuth: boolean;
  logOut: () => void;
}

export function NavBar({ auth, username, isAuth, logOut }: AuthProps) {
  const [isSignInOpen, setSignInOpen] = useState<boolean>(false);
  const [isSignUpOpen, setSignUpOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  function handle() {
    logOut();
    navigate("/home");
  }

  return (
    <nav>
      <ul className="navbar">
        <li>
          <NavLink to={pageLinks.home} className={({ isActive }) => (isActive ? "active-link" : "")}>
            Home
          </NavLink>
        </li>
        <li>
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
        <li>
          <NavLink to={pageLinks.about} className={({ isActive }) => (isActive ? "active-link" : "")}>
            About
          </NavLink>
        </li>

        {!isAuth && (
          <>
            <li>
              <button type="button" onClick={() => setSignInOpen(true)} className="nav-button">
                Sign in
              </button>
            </li>
            <Modal isOpen={isSignInOpen} onClose={() => setSignInOpen(false)} title="Authorization">
              <SignInForm onClose={() => setSignInOpen(false)} auth={(login: string) => auth(login)} />
            </Modal>
            <li>
              <button type="button" onClick={() => setSignUpOpen(true)} className="nav-button">
                Sign up
              </button>
            </li>
            <Modal isOpen={isSignUpOpen} onClose={() => setSignUpOpen(false)} title="Registration">
              <SignUpForm onClose={() => setSignUpOpen(false)} auth={(login: string) => auth(login)} />
            </Modal>
          </>
        )}

        {isAuth && (
          <>
            <li>
              <NavLink to={pageLinks.profile}>
                <button type="button" className="auth-button">
                  <img src={profile} alt="profile" />
                  {username}
                </button>
              </NavLink>
            </li>
            <li>
              <button type="button" className="auth-button">
                <img src={cart} alt="cart" />0
              </button>
            </li>
            <li>
              <button type="button" className="auth-button" onClick={handle}>
                <img src={logout} alt="logout" />
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
