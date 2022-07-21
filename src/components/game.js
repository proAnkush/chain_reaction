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

    if (poppable(i, j, tempMatrix)) {
      pop(i, j, tempMatrix, currentPlayer);
    } else {
      tempMatrix[i][j].tapCount = matrix[i][j].tapCount + 1;
      tempMatrix[i][j].occupiedBy = currentPlayer;
    }
    tempActivePlayers.push(currentPlayer);
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
      if (row.length !== parseInt(constants.GRID_SIZE)) return;
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
    // setGuiBoard(guiMatrix);
    return guiMatrix;
  };

  const isCorner = (i, j) => {
    if (i == 0 && j == 0) return true;
    if (i == 0 && j == constants.GRID_SIZE - 1) return true;
    if (i == constants.GRID_SIZE - 1 && j == 0) return true;
    if (i == constants.GRID_SIZE - 1 && j == constants.GRID_SIZE - 1)
      return true;
    return false;
  };
  const poppable = (i, j, tempMatrix) => {
    if (i < 0 || i >= constants.GRID_SIZE || j < 0 || j > constants.GRID_SIZE) {
      return false;
    }
    if (tempMatrix[i] == undefined || tempMatrix[i][j] == undefined) {
      console.log(i, j);
      console.log(tempMatrix);
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
  useEffect(() => {
    console.log("update MATRIX");

    return () => {};
  }, [matrix]);
  useEffect(() => {
    console.log("update GUI");

    return () => {};
  }, [guiBoard]);

  const isCornerRow = (i, j) => {
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
  const pop = (i, j, tempMatrix, currentPlayer) => {
    if (
      i < 0 ||
      i >= constants.GRID_SIZE ||
      j < 0 ||
      j >= constants.GRID_SIZE
    ) {
      console.log("beyond the boundaries");
      return;
    }
    if (!poppable(i, j, tempMatrix)) {
      tempMatrix[i][j].tapCount = tempMatrix[i][j].tapCount + 1;
      tempMatrix[i][j].occupiedBy = currentPlayer;
      return false;
    } else {
      tempMatrix[i][j].tapCount = 0;
      tempMatrix[i][j].occupiedBy = constants.NO_PLAYER;

      // up j > 0
      pop(i, j - 1, tempMatrix, currentPlayer);
      // right i+1 < constants.grid_size
      pop(i + 1, j, tempMatrix, currentPlayer);
      // down  j+1 < constants.grid_size
      pop(i, j + 1, tempMatrix, currentPlayer);
      // left i > 0
      pop(i - 1, j, tempMatrix, currentPlayer);
    }
  };
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
