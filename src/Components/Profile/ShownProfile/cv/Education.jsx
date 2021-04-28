import React from "react";
const Education = (props) => {
  const data = props.data;

  return (
    <section className="resume-section mt-0" id="education">
      <div className="resume-section-content">
        <h2 className="mb-5">Education</h2>
        {data?.map((educ, index) => (
          <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
            <div className="flex-grow-1">
              <h3 className="mb-0">{educ?.school}</h3>
              <div className="subheading mb-3">{educ?.diploma}</div>
              <div>{educ?.field}</div>
            </div>
            <div className="flex-shrink-0">
              <span className="text-primary">
                {educ?.dateStart?.split(" ")[0] +
                  " " +
                  educ?.dateStart?.split(" ")[2]}{" "}
                -{" "}
                {educ?.dateEnd == "Present" ? educ?.dateEnd : educ?.dateEnd?.split(" ")[0] +
                  " " +
                  educ?.dateEnd?.split(" ")[2]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Education;
