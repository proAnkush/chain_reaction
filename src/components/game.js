import React, { useEffect, useState } from "react";
import "../styles/game.css";
import Navbar from "./navbar";
import constants from "../constants.json";
import "../styles/board.css";
import Legend from "./legend";
import Board from "./board";
function Game(props) {
  const [playerCount, setPlayerCount] = props.match.params.playerCount;
  const [matrix, setMatrix] = useState(Array(constants.GRID_SIZE));
  const move = (i, j) => {
    if (corners(i, j)) {
      console.log("corner");
      return;
    }
    if (cornerRow(i, j)) {
      if (poppable(false, true, false, i, j)) {
        console.log("poppable");
      }
      console.log("corner row");
    }
  };
  const corners = (i, j) => {
    if (i == 0 && j == 0) return true;
    if (i == 0 && j == constants.GRID_SIZE) return true;
    if (i == constants.GRID_SIZE) return true;
    if (i == constants.GRID_SIZE && j == constants.GRID_SIZE) return true;
    return false;
  };
  const poppable = (isCorner, isCornerRow, isMiddle, i, j) => {
    if (isCorner) {
      if (matrix[i][j].tapCount == 1) {
        return true;
      } else {
        return false;
      }
    }
    if (isCornerRow) {
      if (matrix[i][j].tapCount == 2) {
        return true;
      } else {
        return false;
      }
    }
    if (isMiddle) {
      if (matrix[i][j].tapCount == 3) {
        return true;
      } else {
        return false;
      }
    }
    console.log("something went wrong at poppable function");
    return false;
  };
  useEffect(() => {
    console.log(matrix);
    for (let i = 0; i < constants.GRID_SIZE; i++) {
      let row = Array(constants.GRID_SIZE);
      for (let j = 0; j < constants.GRID_SIZE; j++) {
        row[j] = {
          occupiedBy: constants.NO_PLAYER,
          tapCount: 0,
        };
      }
      matrix[i] = row;
    }

    return () => {
      console.log("unmount game");
    };
  }, []);

  const cornerRow = (i, j) => {
    if (
      i == 0 ||
      j == 0 ||
      i == constants.GRID_SIZE ||
      j == constants.GRID_SIZE
    ) {
      return true;
    }
    return false;
  };
  const pop = () => {};
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
          <Board matrix={matrix} move={move} />
        </div>
      </div>
    </div>
  );
}

export default Game;
