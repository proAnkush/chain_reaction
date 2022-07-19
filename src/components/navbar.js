import React from "react";
import "../styles/navbar.css";
function Navbar(props) {
  return (
    <div className="navbar_custom">
      <div className="navbar__heading b">Chain Reaction</div>
      <div className="navbar__heading">{props.screenName}</div>
    </div>
  );
}

export default Navbar;
