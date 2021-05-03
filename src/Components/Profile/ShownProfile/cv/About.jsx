import React from "react";
import "./About.css";

const About = (props) => {
  const data = props.data;
  const email = props.email;
  // const [domaine, setDomaine] = useState("");
  // useEffect(() => {
  //   switch (data?.domaine) {
  //     case "informatique":
  //       setDomaine("Informatique");
  //       break;
  //     case "electrique":
  //       setDomaine("Electrique");
  //       break;
  //     case "economie":
  //       setDomaine("Economie");
  //       break;
  //     case "mecanique":
  //       setDomaine("Mécanique");
  //       break;
  //   }
  // }, []);

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
  const Git = () => {
    const str = data?.socials
      .substring(0, data?.socials.length - 1)
      .substring(1);
    const socArray = str.split(",");
    let a;
    for (const e of socArray) {
      a = e.split(":");
      if (a[0] === '"GitHub"') {
        return (
          <a
            rel="noreferrer"
            target="_blank"
            className="social-icon"
            href={`https://${a[a.length - 1]
              .substring(0, a[a.length - 1].length - 1)
              .substring(1)}`}
          >
            <i className="fab fa-github" />{" "}
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
  const Yt = () => {
    const str = data?.socials
      .substring(0, data?.socials.length - 1)
      .substring(1);
    const socArray = str.split(",");
    let a;
    for (const e of socArray) {
      a = e.split(":");
      if (a[0] === '"YouTube"') {
        console.log(a[0]);
        return (
          <a
            rel="noreferrer"
            target="_blank"
            className="social-icon"
            href={`https://${a[a.length - 1]
              .substring(0, a[a.length - 1].length - 1)
              .substring(1)}`}
          >
            <i class="fab fa-youtube"></i>
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
          {data?.firstName}
          <span className="text-primary">
            &nbsp;
            {data?.lastName}
          </span>
        </h1>
        <div className="subheading mb-5">
          {data?.address + "· " + data?.city + "· " + data?.number + "· "}
          <span className="text-primary">{email}</span>
        </div>
        {/* <p className=" mb-3">
          Domaine d'étude:{" "}
          {data?.domaine[0].toUpperCase() +
            data?.domaine.slice(1, data?.domaine.length)}
        </p> */}
        <p className="lead mb-5">{data?.bio}</p>
        <div className="social-icons d-flex">
          {data && <Fb />}
          {data && <Git />}
          {data && <Ln />}
          {data && <Yt />}
        </div>
      </div>
    </section>
  );
};
export default About;
