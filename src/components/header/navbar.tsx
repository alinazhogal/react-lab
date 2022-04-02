import { useState } from "react";
import { NavLink } from "react-router-dom";
import pageLinks from "../../routesLinks";
import arrow from "../../assets/images/arrow-down.svg";
import Modal from "../modal/modal";
import SignInForm from "../forms/signInForm";
import SignUpForm from "../forms/signUpForm";

function NavBar() {
  const [isSignInOpen, setSignInOpen] = useState<boolean>(false);
  const [isSignUpOpen, setSignUpOpen] = useState<boolean>(false);

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
        <li>
          <button type="button" onClick={() => setSignInOpen(true)} className="nav-button">
            Sign in
          </button>
        </li>
        <Modal isOpen={isSignInOpen} onClose={() => setSignInOpen(false)} title="Authorization">
          <SignInForm onClose={() => setSignInOpen(false)} />
        </Modal>
        <li>
          <button type="button" onClick={() => setSignUpOpen(true)} className="nav-button">
            Sign up
          </button>
        </li>
        <Modal isOpen={isSignUpOpen} onClose={() => setSignUpOpen(false)} title="Registration">
          <SignUpForm onClose={() => setSignUpOpen(false)} />
        </Modal>
      </ul>
    </nav>
  );
}

export default NavBar;
