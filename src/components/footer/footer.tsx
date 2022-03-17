import "./footer.scss";
import g2aLogo from "../../assets/images/g2a.svg";
import valveLogo from "../../assets/images/valve.svg";
import nintendoLogo from "../../assets/images/nintendo.svg";
import segaLogo from "../../assets/images/Sega.svg";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <span>Incredible convenient</span>
        <div className="games-links">
          <a href="https://www.g2a.com/" aria-label="g2a link">
            <img src={g2aLogo} alt="g2a logo" />
          </a>
          <a href="https://www.valvesoftware.com/ru/" aria-label="valve link">
            <img src={valveLogo} alt="valve logo" />
          </a>
          <a href="https://www.nintendo.ru/" aria-label="nintendo link">
            <img src={nintendoLogo} alt="nintendo logo" />
          </a>
          <a href="https://www.sega.com/" aria-label="sega games link">
            <img src={segaLogo} alt="sega logo" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
