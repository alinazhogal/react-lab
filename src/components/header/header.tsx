import { NavLink } from "react-router-dom";
import pageLinks from "../../routesLinks";
import NavBar from "./navbar";
import header from "./header.module.scss";

function Header() {
  return (
    <header>
      <div className={header.container}>
        <NavLink to={pageLinks.home} className={header.logo}>
          Best Games Market
        </NavLink>
        <NavBar />
      </div>
    </header>
  );
}

export default Header;
