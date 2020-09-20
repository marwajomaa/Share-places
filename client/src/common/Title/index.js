import React from "react";
import "./style.css";

const Title = (props) => {
  return <h2 className="main-navigation__title title">{props.label}</h2>;
};

export default Title;
