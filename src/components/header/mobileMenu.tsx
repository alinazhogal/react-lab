import { useState } from "react";
import { NavLink } from "react-router-dom";
import pageLinks from "../../routesLinks";
import burger from "../../assets/images/burger-menu.svg";
import header from "./header.module.scss";

function MobileMenu() {
  const [openMenu, setOpenMenu] = useState(false);
  function handleClick() {
    if (openMenu) {
      setOpenMenu(false);
    } else {
      setOpenMenu(true);
    }
  }

  return (
    <>
      <div
        role="presentation"
        className={openMenu ? `${header.menuLayout} ${header.openLayout}` : `${header.menuLayout}`}
        onClick={() => setOpenMenu(false)}
      />
      <div className={header.mobileNav}>
        <button type="button" aria-label="menu" onClick={handleClick}>
          <img src={burger} alt="mobile menu" />
        </button>
        <div className={openMenu ? `${header.mobileMenu} ${header.open}` : `${header.mobileMenu}`}>
          <NavLink to={pageLinks.about} onClick={() => setOpenMenu(false)}>
            About
          </NavLink>

          <NavLink to={pageLinks.products} onClick={() => setOpenMenu(false)}>
            Products
          </NavLink>
          <div className={header.productsLinks}>
            <NavLink to={`${pageLinks.products}/pc`} onClick={() => setOpenMenu(false)}>
              PC
            </NavLink>
            <NavLink to={`${pageLinks.products}/playstation`} onClick={() => setOpenMenu(false)}>
              Playstation 5
            </NavLink>
            <NavLink to={`${pageLinks.products}/xbox`} onClick={() => setOpenMenu(false)}>
              Xbox One
            </NavLink>
          </div>
          <NavLink to={pageLinks.profile} className={header.profileMobile} onClick={() => setOpenMenu(false)}>
            Profile
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
