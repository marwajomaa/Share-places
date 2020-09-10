import React from "react";

import "./style.css";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClick} />;
};

export default Backdrop;
