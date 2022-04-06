import { NavLink } from "react-router-dom";
import pageLinks from "../../routesLinks";
import { NavBar, AuthProps } from "./navbar";
import "./header.scss";

function Header({ logIn, username, isAuth, logOut, signInOpen, setSignInOpen }: AuthProps) {
  return (
    <header>
      <div className="header-container">
        <NavLink to={pageLinks.home} className="logo">
          Best Games Market
        </NavLink>
        <NavBar
          logIn={logIn}
          username={username}
          isAuth={isAuth}
          logOut={logOut}
          signInOpen={signInOpen}
          setSignInOpen={setSignInOpen}
        />
      </div>
    </header>
  );
}

export default Header;
