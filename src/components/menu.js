import React, { useState } from "react";
import Navbar from "./navbar.js";
function Menu(props) {
  const [playerCount, setPlayerCount] = useState(2);
  return (
    <div>
      <Navbar screenName="Menu" />
      <div>
        <select onClick={(e) => setPlayerCount(parseInt(e.target.value))}>
          <option value={2}>2 Players</option>
          <option value={3}>3 Players</option>
        </select>
      </div>
    </div>
  );
}

export default Menu;
