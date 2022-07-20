import React, { useEffect, useState } from "react";
import "../styles/board.css";
import constants from "../constants.json";

function Board(props) {
  return (
    <div>
      <div className="board">{props.guiBoard?.map((item) => item)}</div>
    </div>
  );
}

export default Board;
