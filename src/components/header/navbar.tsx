import { NavLink } from "react-router-dom";
import pageLinks from "../../routesLinks";
import arrow from "../../assets/images/arrow-down.svg";

function NavBar() {
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
      </ul>
    </nav>
  );
}

export default NavBar;
