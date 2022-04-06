import { useState } from "react";
import { NavLink } from "react-router-dom";
import pageLinks from "../../routesLinks";
import burger from "../../assets/images/burger-menu.svg";

export default function MobileMenu() {
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
        className={openMenu ? "menu-layout open-layout" : "menu-layout"}
        onClick={() => setOpenMenu(false)}
      />
      <div className="mobile-nav">
        <button type="button" aria-label="menu" onClick={handleClick}>
          <img src={burger} alt="mobile menu" />
        </button>
        <div className={openMenu ? "mobile-menu open" : "mobile-menu"}>
          <NavLink to={pageLinks.about} onClick={() => setOpenMenu(false)}>
            About
          </NavLink>

          <NavLink to={pageLinks.products} onClick={() => setOpenMenu(false)}>
            Products
          </NavLink>
          <div className="products-links">
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
        </div>
      </div>
    </>
  );
}
