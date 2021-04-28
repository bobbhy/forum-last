import React from "react";
import "./Sidebarl.css";
import ad from "../../../ad.jpg";
import img from "../../../2.jpeg";

function Sidebarl() {
  return (
    <div className="sidebarl">
      <div className="sidebar_topl">
        <img src={ad} alt="" style={{ marginBottom: "5vh" }} />
        <img src={img} alt="hh" />
      </div>
    </div>
  );
}

export default Sidebarl;
