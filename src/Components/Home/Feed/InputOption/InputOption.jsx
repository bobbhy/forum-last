import React from "react";
import "./InputOption.css";
function InputOption({ Icon, title, color, onClick }) {
  return (
    <div className="inputOption" onClick={onClick}>
      {Icon && <Icon style={{ color }} className="inputOption_icon" />}
      <h5 className="inputOption_title">{title}</h5>
    </div>
  );
}

export default InputOption;
