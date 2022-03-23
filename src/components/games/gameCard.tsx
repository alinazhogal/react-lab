import "./games.scss";
import Button from "../../elements/button";
import minecraft from "../../assets/images/Minecraft_cover.png";
import stars from "../../assets/images/stars.svg";
import xbox from "../../assets/images/xbox.png";

function GameCard() {
  return (
    <div className="game-card">
      <img src={minecraft} alt="" className="game-img" />
      <div className="game-info">
        <div className="main-info">
          <div className="name-rating">
            <h3>Minecraft</h3>
            <img src={stars} alt="" />
          </div>

          <div className="platform">
            <img src={xbox} alt="" />
          </div>
        </div>
        <p>
          In Minecraft, players explore a blocky, procedurally generated 3D world with virtually infinite terrain, and
          may discover and extract raw materials, craft tools and items, and build structures, earthworks and simple
          machines. Depending on game mode, players can fight computer-controlled mobs, as well as cooperate with or
          compete against other players in the same world.
        </p>
        <div className="price-info">
          <h4>$29</h4>
          <Button title="Add to cart" onClick={() => alert("got product")} />
        </div>
      </div>
    </div>
  );
}

export default GameCard;
