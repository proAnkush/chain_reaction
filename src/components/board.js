import React, { useEffect, useState } from "react";
import "../styles/board.css";
import constants from "../constants.json";

function Board(props) {
  // seo fix index title to chain reaction
  // make responsive
  return (
    <div>
      <div className="board">{props.guiBoard?.map((item) => item)}</div>
    </div>
  );
}

export default Board;
