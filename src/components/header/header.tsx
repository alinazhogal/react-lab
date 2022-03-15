import NavBar from "./navbar";
import "./header.scss";

function Header() {
  return (
    <header>
      <div className="header-container">
        <span>Best Games Market</span>
        <NavBar />
      </div>
    </header>
  );
}

export default Header;
