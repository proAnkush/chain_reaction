import React, { useEffect, useState } from "react";
import "../styles/game.css";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./navbar";
import constants from "../constants.json";
import "../styles/board.css";
import Legend from "./legend";
import Board from "./board";
import Headsup from "./headsup";
function Game(props) {
  const generateEmptyMatrix = () => {
    let matrix = Array(gridSize);
    for (let i = 0; i < gridSize; i++) {
      let row = Array(gridSize);
      for (let j = 0; j < gridSize; j++) {
        row[j] = {
          occupiedBy: constants.NO_PLAYER,
          tapCount: 0,
        };
      }
      matrix[i] = row;
    }
    return matrix;
  };

  const [headsupMessage, setHeadsupMessage] = useState("Best of Luck!");
  const [playerCount, setPlayerCount] = useState(
    parseInt(localStorage.getItem("playerCount")) || 2
  );
  const [gridSize, setGridSize] = useState(
    parseInt(localStorage.getItem("gridSize")) || 8
  );
  let firstCycle = 0;

  const [guiBoard, setGuiBoard] = useState();

  let activePlayers = constants.PLAYER_COLOR_MAP[playerCount];

  const [matrix, setMatrix] = useState(() => generateEmptyMatrix());

  const move = (i, j) => {
    if (
      matrix[i][j].occupiedBy != activePlayers[0] &&
      matrix[i][j].occupiedBy != "white"
    ) {
      setHeadsupMessage(
        "You can only click on your occupied tile or white tile."
      );
      return;
    }
    let tempMatrix = [...matrix];
    console.log(activePlayers);
    let currentPlayer = activePlayers.shift();
    activePlayers.push(currentPlayer);
    console.log(currentPlayer);
    console.log(activePlayers.length, activePlayers.length);
    if (poppable(i, j, tempMatrix)) {
      pop(i, j, tempMatrix, currentPlayer);
    } else {
      tempMatrix[i][j].tapCount = matrix[i][j].tapCount + 1;
      tempMatrix[i][j].occupiedBy = currentPlayer;
    }
    setMatrix(tempMatrix);
    setGuiBoard(createBoard(matrix));
    checkEndGame(tempMatrix);
  };

  const checkEndGame = (tempMatrix) => {
    if (firstCycle < playerCount) {
      console.log(firstCycle);
      firstCycle++;
      let r = document.querySelector(":root");
      r.style.setProperty("--BOARD_BORDER_COLOR", activePlayers[0]);
      return false;
    }
    console.log("check end game");
    let playerColors = [...activePlayers];
    let playerOccupiedArea = {};
    for (let i = 0; i < playerColors.length; i++) {
      console.log("1");
      let color = playerColors[i];
      playerOccupiedArea[color] = 0;
    }
    console.log(playerOccupiedArea);
    for (let i = 0; i < tempMatrix.length; i++) {
      for (let j = 0; j < tempMatrix.length; j++) {
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
        eliminatePlayer(color);
      }
    }
    console.log(activePlayers);
    console.log("2");

    let r = document.querySelector(":root");
    r.style.setProperty("--BOARD_BORDER_COLOR", activePlayers[0]);
    if (activePlayers.length == 1) {
      endGame(activePlayers[0]);
    }
    return false;
  };

  const eliminatePlayer = (color) => {
    activePlayers = activePlayers.filter((item) => item != color);
  };

  const endGame = (winningColor) => {
    localStorage.setItem("winner", winningColor);
    window.location.href = "/final";
  };

  const createBoard = (tempMatrix) => {
    if (
      tempMatrix === null ||
      tempMatrix === undefined ||
      tempMatrix.length != gridSize
    ) {
      return;
    }
    let guiMatrix = [];
    for (let i = 0; i < tempMatrix.length; i++) {
      let row = tempMatrix[i];
      if (row.length !== parseInt(gridSize)) return;
      let guiRow = (
        <div>
          {row.map((item, j) => (
            <button
              key={uuidv4().toString()}
              onClick={() => move(i, j)}
              className={
                item.occupiedBy +
                " cell" +
                (poppable(i, j, tempMatrix) ? " poppable" : "")
              }
            >
              {item.tapCount}
            </button>
          ))}
        </div>
      );
      guiMatrix.push(guiRow);
    }
    return guiMatrix;
  };

  const isCorner = (i, j) => {
    if (i == 0 && j == 0) return true;
    if (i == 0 && j == gridSize - 1) return true;
    if (i == gridSize - 1 && j == 0) return true;
    if (i == gridSize - 1 && j == gridSize - 1) return true;
    return false;
  };
  const poppable = (i, j, tempMatrix) => {
    if (i < 0 || i >= gridSize || j < 0 || j > gridSize) {
      return false;
    }
    if (tempMatrix[i] == undefined || tempMatrix[i][j] == undefined) {
      return false;
    }
    if (isCorner(i, j)) {
      if (tempMatrix[i][j].tapCount == 1) {
        return true;
      } else {
        return false;
      }
    }
    if (isCornerRow(i, j)) {
      if (tempMatrix[i][j].tapCount == 2) {
        return true;
      } else {
        return false;
      }
    }
    if (tempMatrix[i][j].tapCount == 3) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    setGuiBoard(createBoard(matrix));

    return () => {
      console.log("unmount game");
    };
  }, []);

  const isCornerRow = (i, j) => {
    if (i == 0 || j == 0 || i == gridSize - 1 || j == gridSize - 1) {
      return true;
    }
    return false;
  };
  const pop = (i, j, tempMatrix, currentPlayer) => {
    if (i < 0 || i >= gridSize || j < 0 || j >= gridSize) {
      return;
    }
    if (!poppable(i, j, tempMatrix)) {
      tempMatrix[i][j].tapCount = tempMatrix[i][j].tapCount + 1;
      tempMatrix[i][j].occupiedBy = currentPlayer;
      return false;
    } else {
      tempMatrix[i][j].tapCount = 0;
      tempMatrix[i][j].occupiedBy = constants.NO_PLAYER;

      pop(i, j - 1, tempMatrix, currentPlayer);
      pop(i + 1, j, tempMatrix, currentPlayer);
      pop(i, j + 1, tempMatrix, currentPlayer);
      pop(i - 1, j, tempMatrix, currentPlayer);
    }
  };
  return (
    <div>
      <Navbar screenName={playerCount + "P Match"} />
      <div className="game">
        <div className="verticalSection1">
          <Board
            matrix={matrix}
            createBoard={createBoard}
            guiBoard={guiBoard}
            elevation={3}
          />
          <Headsup message={headsupMessage} />
        </div>
        <div className="verticalSection2">
          <Legend playerCount={playerCount} />
        </div>
      </div>
    </div>
  );
}

export default Game;
