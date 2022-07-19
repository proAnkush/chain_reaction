import React from "react";
import { Table } from "react-bootstrap";
import "../styles/legend.css";

function Legend(props) {
  return (
    <div className="legend">
      <Table striped hover className="legend_table">
        {[...Array(parseInt(props.playerCount))].map((e, i) => (
          <tr>
            <td className={"pallete p" + (i + 1)}></td>
            <td>Player {i + 1}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

export default Legend;
