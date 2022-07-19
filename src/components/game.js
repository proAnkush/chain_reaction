import React, { useEffect, useState } from "react";
import "../styles/game.css";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./navbar";
import constants from "../constants.json";
import "../styles/board.css";
import Legend from "./legend";
import Board from "./board";
function Game(props) {
  const generateEmptyMatrix = () => {
    let matrix = Array(constants.GRID_SIZE);
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
    return matrix;
  };
  const [playerCount, setPlayerCount] = props.match.params.playerCount;
  const [guiBoard, setGuiBoard] = useState();

  const [activePlayer, setActivePlayers] = [
    constants[constants.PLAYER_MAP[props.match.params.playerCount]],
  ];
  const [matrix, setMatrix] = useState(() => generateEmptyMatrix());
  const currentPlayer = constants.PLAYER_ONE;
  const move = (i, j) => {
    let tempMatrix = [...matrix];

    console.log(tempMatrix === matrix);
    console.log(tempMatrix == matrix);
    console.log(i, j);
    if (corners(i, j)) {
      if (poppable(true, false, false, i, j)) {
        console.log("poppable");
      }
      console.log("corner");
      return;
    }
    if (cornerRow(i, j)) {
      if (poppable(false, true, false, i, j)) {
        console.log("poppable");
      }
      console.log("corner row");
    }
    console.log(tempMatrix);
    console.log(matrix);
    tempMatrix[i][j].tapCount = matrix[i][j].tapCount + 1;

    console.log(tempMatrix[i][j] == matrix[i][j]);
    setGuiBoard(createBoard(matrix));
    setMatrix(tempMatrix);
    checkEndGame(tempMatrix);
  };

  const checkEndGame = (tempMatrix) => {
    for (let i = 0; i < tempMatrix.length; i++) {
      for (let j = 0; j < tempMatrix.length; j++) {
        // if(tempMatrix[i][j].occupiedBy == constants.PLAYER_ONE)
      }
    }
  };

  const createBoard = (tempMatrix) => {
    console.log("MATRIX");
    if (
      tempMatrix === null ||
      tempMatrix === undefined ||
      tempMatrix.length != constants.GRID_SIZE
    ) {
      console.log(typeof tempMatrix);
      return;
    }
    console.log(tempMatrix);
    let guiMatrix = [];
    for (let i = 0; i < tempMatrix.length; i++) {
      let row = tempMatrix[i];
      if (row.length !== 8) return;
      console.log(row);
      let guiRow = (
        <div>
          {row.map((item, j) => (
            <button
              key={uuidv4()}
              onClick={() => move(i, j)}
              className={item.occupiedBy}
            >
              {item.tapCount}
            </button>
          ))}
        </div>
      );
      console.log(guiRow);
      guiMatrix.push(guiRow);
    }
    // setGuiBoard(guiMatrix);
    console.log(guiMatrix[0]);
    return guiMatrix;
  };

  const corners = (i, j) => {
    if (i == 0 && j == 0) return true;
    if (i == 0 && j == constants.GRID_SIZE - 1) return true;
    if (i == constants.GRID_SIZE - 1 && j == 0) return true;
    if (i == constants.GRID_SIZE - 1 && j == constants.GRID_SIZE - 1)
      return true;
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

    setGuiBoard(createBoard(matrix));
    console.log(matrix);
    return () => {
      console.log("unmount game");
    };
  }, []);

  const cornerRow = (i, j) => {
    if (
      i == 0 ||
      j == 0 ||
      i == constants.GRID_SIZE - 1 ||
      j == constants.GRID_SIZE - 1
    ) {
      return true;
    }
    return false;
  };
  const pop = () => {};
  return (
    <div>
      <Navbar screenName={playerCount + "P Match"} />
      <div className="game">
        <div className="verticalSection1">
          <Legend playerCount={playerCount} />
        </div>
        <div className="verticalSection2">
          <Board
            matrix={matrix}
            createBoard={createBoard}
            guiBoard={guiBoard}
          />
        </div>
      </div>
    </div>
  );
}

export default Game;
