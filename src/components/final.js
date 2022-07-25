import React, { useState } from "react";
import Navbar from "./navbar";
import "../styles/final.css";
import constants from "../constants.json";
import { Snackbar } from "@mui/material";
import { useHistory } from "react-router-dom";
function Final(props) {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(true);
  let history = useHistory();
  const cleanup = () => {
    console.log(localStorage.getItem("gridSize"));
    localStorage.removeItem("matrix");
    localStorage.removeItem("playerCount");
    localStorage.removeItem("gridSize");
    localStorage.removeItem("isGameInProgress");
    console.log(localStorage.getItem("gridSize"));
  };
  return (
    <div>
      {cleanup()}
      <Navbar screenName="Finish" />
      <div className="final_msgBox">
        <span className="final_winnerName">
          {localStorage.getItem("winner")}
        </span>{" "}
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={() => setIsSnackbarOpen(false)}
          message={
            constants[localStorage.getItem("winner")] + " won this round."
          }
        />
      </div>
      <button onClick={() => history.push("/")} className="btn btn-primary">
        Main Menu
      </button>
    </div>
  );
}

export default Final;
