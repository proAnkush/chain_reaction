import React, { useEffect, useState } from "react";
import "../styles/board.css";
import constants from "../constants.json";

function Board(props) {
  // useEffect(() => {
  //   // component did mount
  //   setGuiBoard(props.createBoard());
  //   console.log(guiBoard);
  //   console.log(props.matrix);
  // }, []);
  // // useEffect(() => {
  // //   setGuiBoard(props.createBoard());
  // // });
  // useEffect(() => {
  //   console.warn("UPDATE");
  //   setGuiBoard(props.createBoard());
  // }, [props.matrix]);
  return (
    <div>
      {console.log(props.guiBoard)}
      <div className="board">{props.guiBoard?.map((item) => item)}</div>
    </div>
  );
}

export default Board;
