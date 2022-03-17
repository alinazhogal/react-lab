import { NavLink } from "react-router-dom";
import pageLinks from "../../routesLinks";

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
          <NavLink to={pageLinks.products} className={({ isActive }) => (isActive ? "active-link" : "")}>
            Products
          </NavLink>
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
