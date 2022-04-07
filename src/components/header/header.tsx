import { NavLink } from "react-router-dom";
import pageLinks from "../../routesLinks";
import NavBar from "./navbar";
import "./header.scss";

function Header() {
  return (
    <header>
      <div className="header-container">
        <NavLink to={pageLinks.home} className="logo">
          Best Games Market
        </NavLink>
        <NavBar />
      </div>
    </header>
  );
}

export default Header;
