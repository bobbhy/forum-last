import React from "react";
import "./Award.css";

const Award = (props) => {
  const data = props.data;

  return (
    <section className="resume-section" id="awards">
      <div className="resume-section-content">
        {data?.length > 0 && <h2 className="mb-5">Awards</h2>}
        <ul className="fa-ul mb-0">
          {data?.map((award, index) => (
            <li>
              <span className="fa-li">
                {award?.position < 4 && (
                  <span>
                    <i className="fas fa-trophy text-warning fa-lg" />
                    &nbsp;
                  </span>
                )}
              </span>
              {award?.position[award?.position?.length - 1] === "1" && (
                <span>
                  {award?.position}
                  <sup>st</sup>&nbsp;place in {award?.name}. -{" "}
                  {award?.organizer}
                </span>
              )}
              {award?.position[award?.position?.length - 1] === "2" && (
                <span>
                  {award?.position}
                  <sup>nd</sup>&nbsp;place in {award?.name}. -{" "}
                  {award?.organizer}
                </span>
              )}
              {award?.position[award?.position?.length - 1] === "3" && (
                <span>
                  {award?.position}
                  <sup>rd</sup>&nbsp;place in {award?.name}. -{" "}
                  {award?.organizer}
                </span>
              )}
              {(parseInt(award?.position[award?.position?.length - 1]) > 3 ||
                parseInt(award?.position[award?.position?.length - 1]) ===
                  0) && (
                <span>
                  {award?.position}
                  <sup>th</sup>&nbsp;place in {award?.name}. -{" "}
                  {award?.organizer}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
export default Award;
