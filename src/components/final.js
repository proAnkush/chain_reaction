import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import "../styles/final.css";
import constants from "../constants.json";
import { Snackbar } from "@mui/material";
import { useHistory } from "react-router-dom";
function Final(props) {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(true);
  const [winner, setWinner] = useState(localStorage.getItem("winner"));
  let history = useHistory();
  const cleanup = () => {
    console.log(localStorage.getItem("gridSize"));
    localStorage.removeItem("matrix");
    localStorage.removeItem("playerCount");
    localStorage.removeItem("gridSize");
    localStorage.removeItem("isGameInProgress");
    console.log(localStorage.getItem("gridSize"));
  };
  useEffect(() => {
    cleanup();

    return () => {
      localStorage.removeItem("winner");
    };
  }, []);

  return (
    <div>
      {winner && (
        <div>
          <Navbar screenName="Finish" />
          <div className="final_msgBox">
            <span className="final_winnerName">{winner}</span>{" "}
            <Snackbar
              open={isSnackbarOpen}
              autoHideDuration={6000}
              onClose={() => setIsSnackbarOpen(false)}
              message={constants[winner] + " won this round."}
            />
          </div>
          <button onClick={() => history.push("/")} className="btn btn-primary">
            Main Menu
          </button>
        </div>
      )}
      {!winner && (
        <div>
          <Navbar error="error" screenName="ERROR" />
          {console.log("ERROR")}
          <div className="final_msgBox">
            <span className="final_winnerName">{"ERROR"}</span>{" "}
            <Snackbar
              open={isSnackbarOpen}
              autoHideDuration={6000}
              onClose={() => setIsSnackbarOpen(false)}
              message={"ERROR"}
            />
          </div>
          <button onClick={() => history.push("/")} className="btn btn-primary">
            ERROR?
          </button>
        </div>
      )}
    </div>
  );
}

export default Final;
