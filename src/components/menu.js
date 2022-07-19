import React, { useState } from "react";
import Navbar from "./navbar.js";
import bootstrap from "bootstrap";
import "../styles/menu.css";
import constants from "../constants.json";
function Menu(props) {
  const [playerCount, setPlayerCount] = useState(2);
  return (
    <div>
      <Navbar screenName="Menu" />
      <div className="customize">
        <p>Select number of friends playing the game:</p>
        <select
          onClick={(e) =>
            setPlayerCount(parseInt(e.target.value)) &&
            localStorage.setItem("playerCount", parseInt(e.target.value))
          }
        >
          <option value={2}>2 Friends</option>
          <option value={3}>3 Friends</option>
          <option value={4}>4 Friends</option>
        </select>
      </div>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => (window.location.href = "/game/" + playerCount)}
        >
          Start Game
        </button>
        <p className="zm" style={{ fontSize: "12px" }}>
          You are playing {constants.GAME} with {playerCount} Friends where
          board size is {constants.GRID_SIZE}
        </p>
      </div>
    </div>
  );
}

export default Menu;
