import React from "react";
import "./Interest.css";

const Interest = (props) => {
  const data = props.data;
  return (
    <section className="resume-section" id="interests">
      <div className="resume-section-content">

        <h2 className="mb-5">Interests</h2>
        <p>{data}</p>
      </div>
    </section>
  );
};
export default Interest;
