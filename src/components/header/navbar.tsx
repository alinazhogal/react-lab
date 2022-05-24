import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux";
import { logOut } from "../../redux/actions/authActions";
import { removeItemFromStorage, SavableKeys } from "../../helpers/storage";
import setSignInOpen from "../../redux/actions/modalActions";
import { ActionsType } from "../../redux/types";
import pageLinks from "../../routesLinks";
import arrow from "../../assets/images/arrow-down.svg";
import profile from "../../assets/images/account.svg";
import cartIcon from "../../assets/images/cart.svg";
import logout from "../../assets/images/log-out.svg";
import Modal from "../modal/modal";
import SignInForm from "../modal/forms/signIn";
import SignUpForm from "../modal/forms/signUp";
import MobileMenu from "./mobileMenu";
import PrivateLink from "./privateLink";
import header from "./header.module.scss";

function NavBar() {
  const [isSignUpOpen, setSignUpOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSignInOpen = useSelector((state: RootState) => state.modal.isOpen);
  const user = useSelector((state: RootState) => state.auth);
  const cart = useSelector((state: RootState) => state.cart);

  const total = cart.reduce((acc, cur) => acc + Number(cur.amount), 0);

  const handleLogOut = () => {
    dispatch(logOut());
    dispatch({ type: ActionsType.CLEAR_CART });
    removeItemFromStorage(SavableKeys.User);
    navigate(pageLinks.home);
  };

  function onSignInOpen() {
    dispatch(setSignInOpen(true));
  }

  function onSignInClose() {
    dispatch(setSignInOpen(false));
  }

  return (
    <nav>
      <ul className={header.navbar}>
        <li className={header.navHome}>
          <NavLink to={pageLinks.home} className={({ isActive }) => (isActive ? `${header.active}` : "")}>
            Home
          </NavLink>
        </li>
        <li className={header.navProd}>
          <div className={header.dropdown}>
            <PrivateLink
              to={pageLinks.products}
              activeCn={`${header.active} ${header.dropbtn}`}
              passiveCn={header.dropbtn}
            >
              Products
              <img src={arrow} alt="arrow" className={header.arrow} />
            </PrivateLink>
            <div className={header.dropdownContent} data-testid="display-categories">
              <PrivateLink to={`${pageLinks.products}/pc`} passiveCn={header.productLink}>
                PC
              </PrivateLink>
              <PrivateLink to={`${pageLinks.products}/playstation`} passiveCn={header.productLink}>
                Playstation 5
              </PrivateLink>
              <PrivateLink to={`${pageLinks.products}/xbox`} passiveCn={header.productLink}>
                Xbox One
              </PrivateLink>
            </div>
          </div>
        </li>
        <li className={header.navAbout}>
          <PrivateLink to={pageLinks.about} activeCn={header.active} passiveCn="">
            About
          </PrivateLink>
        </li>

        {!user.isAuth && (
          <>
            <li>
              <button type="button" onClick={onSignInOpen} className={header.navButton}>
                Sign in
              </button>
            </li>
            <Modal isOpen={isSignInOpen} onClose={() => onSignInClose()} title="Authorization">
              <SignInForm />
            </Modal>
            <li>
              <button type="button" onClick={() => setSignUpOpen(true)} className={header.navButton}>
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
                <button
                  type="button"
                  className={`${header.authButton} ${header.profileDesc}`}
                  aria-label="profile page"
                >
                  <img src={profile} alt="profile" />
                  {user.username}
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to={pageLinks.cart}>
                <button type="button" className={header.authButton} aria-label="cart page">
                  <img src={cartIcon} alt="cart" />
                  {total}
                </button>
              </NavLink>
            </li>
            <li>
              <button type="button" className={header.authButton} onClick={handleLogOut} aria-label="log out">
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

export default NavBar;
