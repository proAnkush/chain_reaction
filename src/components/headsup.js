import React from "react";
import "../styles/headsup.css";
import Alert from "@mui/material/Alert";
function Headsup(props) {
  return (
    <div className="headsup">
      {/* <p className="zm"> */}
      <Alert className="zm" variant="outlined" severity="info">
        {props.message}
      </Alert>
      {/* </p> */}
    </div>
  );
}

export default Headsup;
