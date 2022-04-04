import { NavLink } from "react-router-dom";
import pageLinks from "../../routesLinks";
import { NavBar, AuthProps } from "./navbar";
import "./header.scss";

function Header({ auth, username, isAuth, logOut }: AuthProps) {
  return (
    <header>
      <div className="header-container">
        <NavLink to={pageLinks.home} className="logo">
          Best Games Market
        </NavLink>
        <NavBar auth={(login: string) => auth(login)} username={username} isAuth={isAuth} logOut={logOut} />
      </div>
    </header>
  );
}

export default Header;
