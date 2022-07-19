import React, { useState } from "react";
import "../styles/game.css";
import Navbar from "./navbar";
import constants from "../constants.json";
import "../styles/board.css";
import Legend from "./legend";
function Game(props) {
  const [playerCount, setPlayerCount] = props.match.params.playerCount;
  const [matrix, setMatrix] = useState(
    [constants.GRID_SIZE][constants.GRID_SIZE]
  );

  return (
    <div>
      <Navbar screenName={playerCount + "P Match"} />
      {/* <Board size={constants.GRID_SIZE} playerCount={parseInt(playerCount)} />
       */}
      <div className="game">
        <div className="verticalSection1">
          <Legend playerCount={playerCount} />
        </div>
        <div className="verticalSection2">
          <Board />
        </div>
      </div>
    </div>
  );
}

export default Game;
