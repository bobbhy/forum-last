import React from "react";
import "./Experience.css";
const Experience = (props) => {
  const data = props.data;
  console.log(props.data);
  return (
    <>
      <section className="resume-section" id="experience">
        <div className="resume-section-content">
          <h2 className="mb-5">
            Experiences Professionnelles et Projets
            universitaires/professionnels
          </h2>
          {data
            ?.filter((e) => !e?.isProject)
            ?.map((experience) => (
              <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
                <div className="flex-grow-1">
                  <h3 className="mb-0">{experience?.occupation}</h3>
                  <div className="subheading mb-3">{experience?.company}</div>
                  <p>{experience?.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-primary">
                    {experience?.dateStart?.split(" ")[0] +
                      " " +
                      experience?.dateStart?.split(" ")[2]}{" "}
                    -{" "}
                    {experience?.dateEnd == "Present"
                      ? experience?.dateEnd
                      : experience?.dateEnd?.split(" ")[0] +
                        " " +
                        experience?.dateEnd?.split(" ")[2]}
                  </span>
                </div>
              </div>
            ))}
          {data
            ?.filter((e) => e?.isProject)
            ?.map((experience) => (
              <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
                <div className="flex-grow-1">
                  <h3 className="mb-0">{experience?.occupation}</h3>
                  <p>{experience?.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-primary">
                    {experience?.dateStart?.split(" ")[0] +
                      " " +
                      experience?.dateStart?.split(" ")[2]}{" "}
                    -{" "}
                    {experience?.dateEnd == "Present"
                      ? experience?.dateEnd
                      : experience?.dateEnd?.split(" ")[0] +
                        " " +
                        experience?.dateEnd?.split(" ")[2]}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};
export default Experience;
