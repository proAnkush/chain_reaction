import React, { useState } from "react";
import Navbar from "./navbar.js";
import bootstrap from "bootstrap";
import "../styles/menu.css";
import constants from "../constants.json";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
function Menu(props) {
  const [playerCount, setPlayerCount] = useState(2);
  const [gridSize, setGridSize] = useState(8);
  const startGame = () => {
    localStorage.setItem("playerCount", playerCount);
    localStorage.setItem("gridSize", gridSize);
    window.location.href = "/game/" + playerCount;
  };
  return (
    <div>
      <Navbar screenName="Menu" />
      <div className="customize">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Friends</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Friends Count"
            value={playerCount}
            onChange={(e) => setPlayerCount(parseInt(e.target.value))}
          >
            <MenuItem value={2}>2 Friends</MenuItem>
            <MenuItem value={3}>3 Friends</MenuItem>
            <MenuItem value={4}>4 Friends</MenuItem>
          </Select>
          <FormHelperText>Select total players</FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Board Size
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Board Size"
            value={gridSize}
            onChange={(e) => setGridSize(parseInt(e.target.value))}
          >
            <MenuItem value={4}>4*4 Grid</MenuItem>
            <MenuItem value={5}>5*5 Grid</MenuItem>
            <MenuItem value={6}>6*6 Grid</MenuItem>
            <MenuItem value={7}>7*7 Grid</MenuItem>
            <MenuItem value={8}>8*8 Grid</MenuItem>
            <MenuItem value={9}>9*9 Grid</MenuItem>
          </Select>
          <FormHelperText>Select board size.</FormHelperText>
        </FormControl>
      </div>
      <div>
        <button className="btn btn-primary" onClick={() => startGame()}>
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
