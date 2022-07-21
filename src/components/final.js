import React, { useState } from "react";
import Navbar from "./navbar";
import "../styles/final.css";
import constants from "../constants.json";
import { Snackbar } from "@mui/material";
function Final(props) {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(true);
  return (
    <div>
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
      <button
        onClick={() => (window.location.href = "/")}
        className="btn btn-primary"
      >
        Main Menu
      </button>
    </div>
  );
}

export default Final;
