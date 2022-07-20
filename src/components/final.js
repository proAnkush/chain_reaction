import React from "react";
import Navbar from "./navbar";
import "../styles/final.css";
function Final(props) {
  return (
    <div>
      <Navbar screenName="Finish" />
      <div className="final_msgBox">
        <span className="final_winnerName">
          {localStorage.getItem("winner")}
        </span>{" "}
      </div>
    </div>
  );
}

export default Final;
