import React from "react";
import "./style.css";

const Avatar = (props) => {
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={props.src}
        alt={props.alt}
        style={{
          width: props.width,
          height: props.height,
          borderRadius: props.borderRadius,
        }}
      />
    </div>
  );
};

export default Avatar;
