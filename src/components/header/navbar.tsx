import { Link } from "react-router-dom";
import pageLinks from "../../routesLinks";

function NavBar() {
  return (
    <ul className="navbar">
      <li>
        <Link to={pageLinks.home}>Home</Link>
      </li>
      <li>
        <Link to={pageLinks.products}>Products</Link>
      </li>
      <li>
        <Link to={pageLinks.about}> About</Link>
      </li>
    </ul>
  );
}

export default NavBar;
