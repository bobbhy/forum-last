import React from "react";

const About = (props) => {
  const data = props?.data?.aboutCompany;
  const email = props?.email;

  
const Fb = () => {
    for (let i = 0; i < props?.data?.links?.length; i++) {
      if (props?.data?.links[i]?.name == "Facebook") {
        return (
          <a
            rel="noreferrer"
            target="_blank"
            className="social-icon"
            href={`${props?.data?.links[i]?.url}`}
          >
            <i className="fab fa-facebook-f" />
          </a>
        );
      }
    }
    return <></>;
  };
  const Ln = () => {
    for (let i = 0; i < props?.data?.links?.length; i++) {
      if (props?.data?.links[i]?.name == "LinkedIn") {
        return (
          <a
            rel="noreferrer"
            target="_blank"
            className="social-icon"
            href={`${props?.data?.links[i]?.url}`}
          >
            <i className="fab fa-linkedin-in" />
          </a>
        );
      }
    }
    return <></>;
  };
const Web = () => {
    for (let i = 0; i < props?.data?.links?.length; i++) {
      if (props?.data?.links[i]?.name == "Website") {
        return (
          <a
            rel="noreferrer"
            target="_blank"
            className="social-icon"
            href={`${props?.data?.links[i]?.url}`}
          >
            <i className="fas fa-globe" />
          </a>
        );
      }
    }
    return <></>;
  };

  return (
    <section className="resume-section" id="about">
      <div className="resume-section-content">
        <h1 className="mb-0">
          <span className="text-primary">
            &nbsp;
            {data?.name}
          </span>
        </h1>
        <div className="lead mb-5">
          Address : {data?.address}&nbsp;
          <span style={{ color: "brown", fontWeight: "bolder" }}>
            {data?.city}
          </span>
          <br />
          Email : {email} <br />
          Phone : {data?.number} <br />
        </div>
        <h4>Company Bio :</h4>
        <p className="lead mb-5">{data?.bio}</p>
        <div className="social-icons d-flex">
          <Fb />
          <Web />
          <Ln />
        </div>
      </div>
    </section>
  );
};
export default About;
