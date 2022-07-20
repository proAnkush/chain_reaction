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
  let firstCycle = 0;

  const [guiBoard, setGuiBoard] = useState();

  const [activePlayers, setActivePlayers] = useState(
    constants.PLAYER_COLOR_MAP[playerCount]
  );
  const [matrix, setMatrix] = useState(() => generateEmptyMatrix());
  // const [currentPlayer, setCurrentPlayer] = useState(0);
  const move = (i, j) => {
    if (
      matrix[i][j].occupiedBy != activePlayers[0] &&
      matrix[i][j].occupiedBy != "white"
    ) {
      // only allow clicking on white or self occupied tiles

      return;
    }
    let tempMatrix = [...matrix];
    let tempActivePlayers = activePlayers;
    // let tempActivePlayers = [...activePlayers];
    let currentPlayer = tempActivePlayers.shift();

    if (corners(i, j)) {
      if (poppable(true, false, false, i, j)) {
        console.log("poppable");
      }
      // pop()
    }
    if (cornerRow(i, j)) {
      if (poppable(false, true, false, i, j)) {
        console.log("poppable");
      }
      // pop()
    }
    tempMatrix[i][j].tapCount = matrix[i][j].tapCount + 1;
    tempActivePlayers.push(currentPlayer);
    tempMatrix[i][j].occupiedBy = currentPlayer;
    // let cells = document.getElementsByClassName("cells");
    let r = document.querySelector(":root");
    r.style.setProperty("--BOARD_BORDER_COLOR", tempActivePlayers[0]);
    setMatrix(tempMatrix);
    setActivePlayers(tempActivePlayers);
    setGuiBoard(createBoard(matrix));
    checkEndGame(tempMatrix);
    // localStorage.setItem("matrix", matrix)
  };

  const checkEndGame = (tempMatrix) => {
    if (firstCycle < playerCount) {
      console.log(firstCycle);
      // avoid overflow of cycle count for long game
      firstCycle++;
      return;
    }
    console.log("check end game");
    let playerColors = [...activePlayers];
    let playerOccupiedArea = {};
    let tempActivePlayers = [...activePlayers];
    for (let i = 0; i < playerColors.length; i++) {
      console.log("1");
      let color = playerColors[i];
      playerOccupiedArea[color] = 0;
    }
    console.log(playerOccupiedArea);
    for (let i = 0; i < tempMatrix.length; i++) {
      for (let j = 0; j < tempMatrix.length; j++) {
        // if(tempMatrix[i][j].occupiedBy == constants.PLAYER_ONE)
        if (playerColors[tempMatrix[i][j].occupiedBy] != "white") {
          playerOccupiedArea[tempMatrix[i][j].occupiedBy] =
            playerOccupiedArea[tempMatrix[i][j].occupiedBy] + 1;
        }
      }
    }
    console.log(playerOccupiedArea);
    console.log("2");
    for (let i = 0; i < playerColors.length; i++) {
      let color = playerColors[i];
      if (playerOccupiedArea[color] == 0) {
        tempActivePlayers = tempActivePlayers.filter(
          (player) => player !== color
        );
      }
    }
    console.log(tempActivePlayers);
    console.log("2");

    setActivePlayers(tempActivePlayers);
    if (tempActivePlayers.length == 1) {
      endGame(tempActivePlayers[0]);
    }
    return false;
  };

  const endGame = (winningColor) => {
    // game ended
    console.log(winningColor);
    console.log("winner");
    localStorage.setItem("winner", winningColor);
    window.location.href = "/final";
  };

  const createBoard = (tempMatrix) => {
    if (
      tempMatrix === null ||
      tempMatrix === undefined ||
      tempMatrix.length != constants.GRID_SIZE
    ) {
      return;
    }
    let guiMatrix = [];
    for (let i = 0; i < tempMatrix.length; i++) {
      let row = tempMatrix[i];
      if (row.length !== 8) return;
      let guiRow = (
        <div>
          {row.map((item, j) => (
            <button
              key={uuidv4().toString()}
              onClick={() => move(i, j)}
              className={item.occupiedBy + " cell"}
            >
              {item.tapCount}
            </button>
          ))}
        </div>
      );
      guiMatrix.push(guiRow);
    }
    // setGuiBoard(guiMatrix);
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
    setGuiBoard(createBoard(matrix));

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
