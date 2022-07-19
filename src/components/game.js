import React from "react";
import "../styles/game.css";
import Navbar from "./navbar";
import constants from "../constants.json";
import Board from "./board";
function Game(props) {
  const [playerCount, setPlayerCount] = props.match.params.playerCount;

  return (
    <div>
      <Navbar screenName={playerCount + "P Match"} />
      <Board size={constants.GRID_SIZE} playerCount={parseInt(playerCount)} />
    </div>
  );
}

export default Game;
