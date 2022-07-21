import React, { useState } from "react";
import Navbar from "./navbar.js";
import bootstrap from "bootstrap";
import "../styles/menu.css";
import constants from "../constants.json";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const [helpDialog, setHelpDialog] = useState(false);
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
            <MenuItem value={5}>5 Friends</MenuItem>
            <MenuItem value={6}>6 Friends</MenuItem>
            <MenuItem value={7}>7 Friends</MenuItem>
            <MenuItem value={8}>8 Friends</MenuItem>
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
        <button
          style={{ marginRight: "20px" }}
          className="btn btn-primary"
          onClick={() => startGame()}
        >
          Start Game
        </button>
        {/* <div> */}
        <Button variant="outlined" onClick={() => setHelpDialog(true)}>
          Help
        </Button>
        <Dialog
          open={helpDialog}
          onClose={() => setHelpDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"How To Play"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <em>
                The objective of Chain Reaction is to take control of the board
                by eliminating your opponents' orbs.
                <br />
              </em>{" "}
              Players take it in turns to place occupy cells by their color.
              Once a cell has reached critical number of taps, the cells explode
              into the surrounding cells adding an extra count and claiming the
              cell for the player. A player may only increase mass of their
              color cell or in a blank cell. As soon as a player looses all
              their cells they are out of the game.
              <ul>
                <li>Corner tiles explode after 2 clicks</li>
                <li>Border tiles explode after 3 clicks</li>
                <li>All other tiles explode after 4 clicks</li>
              </ul>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => setHelpDialog(false)}
              autoFocus
            >
              I'm Ready
            </Button>
          </DialogActions>
        </Dialog>
        {/* </div> */}
        <p className="zm" style={{ fontSize: "12px" }}>
          You are playing {constants.GAME} with {playerCount} Friends where
          board size is {gridSize}
        </p>
      </div>
    </div>
  );
}

export default Menu;
