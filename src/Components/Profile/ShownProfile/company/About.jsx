import React from "react";

const About = (props) => {
  const data = props?.data;
  const email = props?.email;
  const Fb = () => {
    const str = data?.socials
      .substring(0, data?.socials.length - 1)
      .substring(1);
    const socArray = str.split(",");
    let a;
    for (const e of socArray) {
      a = e.split(":");
      if (a[0] === '"Facebook"') {
        return (
          <a
            rel="noreferrer"
            target="_blank"
            className="social-icon"
            href={`https://${a[a.length - 1]
              .substring(0, a[a.length - 1].length - 1)
              .substring(1)}`}
          >
            <i className="fab fa-facebook-f" />
          </a>
        );
      }
    }
    return <div></div>;
  };
  const Website = () => {
    const str = data?.socials
      .substring(0, data?.socials.length - 1)
      .substring(1);
    const socArray = str.split(",");
    let a;
    for (const e of socArray) {
      a = e.split(":");
      if (a[0] === '"Website"') {
        return (
          <a
            rel="noreferrer"
            target="_blank"
            className="social-icon"
            href={`https://${a[a.length - 1]
              .substring(0, a[a.length - 1].length - 1)
              .substring(1)}`}
          >
            <i class="fas fa-globe" />{" "}
          </a>
        );
      }
    }
    return <div></div>;
  };
  const Ln = () => {
    const str = data?.socials
      .substring(0, data?.socials.length - 1)
      .substring(1);
    const socArray = str.split(",");
    let a;
    for (const e of socArray) {
      a = e.split(":");
      if (a[0] === '"LinkedIn"') {
        return (
          <a
            rel="noreferrer"
            target="_blank"
            className="social-icon"
            href={`https://${a[a.length - 1]
              .substring(0, a[a.length - 1].length - 1)
              .substring(1)}`}
          >
            <i className="fab fa-linkedin-in" />
          </a>
        );
      }
    }
    return <div></div>;
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
          {data && <Fb />}
          {data && <Website />}
          {data && <Ln />}
        </div>
      </div>
    </section>
  );
};
export default About;
