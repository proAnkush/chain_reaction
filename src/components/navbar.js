import React from "react";
import "../styles/navbar.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
function Navbar(props) {
  return (
    <div className="navbar_custom">
      <div
        className="navbar__heading b"
        onClick={() => (window.location.href = "/")}
      >
        <span>
          <ArrowBackIosIcon />
          {props.error ? "ERROR" : "Chain Reaction"}
        </span>
      </div>
      <div className="navbar__heading">{props.screenName}</div>
    </div>
  );
}

export default Navbar;
