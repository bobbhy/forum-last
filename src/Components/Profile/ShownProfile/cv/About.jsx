import React, { useState, useEffect } from "react";
import userService from "../../../../services/userService";
import "./About.css";

const About = (props) => {
  const etablishment = props?.data?.etablishment?.name;
  const data = props?.data?.cv?.about;
  const email = props.email;

  const Fb = () => {
    for (let i = 0; i < props?.data?.cv?.links?.length; i++) {
      if (props?.data?.cv?.links[i]?.name == "Facebook") {
        return (
          <a
            rel="noreferrer"
            target="_blank"
            className="social-icon"
            href={`${props?.data?.cv?.links[i]?.url}`}
          >
            <i className="fab fa-facebook-f" />
          </a>
        );
      }
    }
    return <></>;
  };
  const Ln = () => {
    for (let i = 0; i < props?.data?.cv?.links?.length; i++) {
      if (props?.data?.cv?.links[i]?.name == "Facebook") {
        return (
          <a
            rel="noreferrer"
            target="_blank"
            className="social-icon"
            href={`${props?.data?.cv?.links[i]?.url}`}
          >
            <i className="fab fa-linkedin-in" />
          </a>
        );
      }
    }
    return <></>;
  };
  const Git = () => {
    for (let i = 0; i < props?.data?.cv?.links?.length; i++) {
      if (props?.data?.cv?.links[i]?.name == "GitHub") {
        return (
          <a
            rel="noreferrer"
            target="_blank"
            className="social-icon"
            href={`${props?.data?.cv?.links[i]?.url}`}
          >
            <i className="fab fa-github" />
          </a>
        );
      }
    }
    return <></>;
  };
  const Yt = () => {
    for (let i = 0; i < props?.data?.cv?.links?.length; i++) {
      if (props?.data?.cv?.links[i]?.name == "YouTube") {
        return (
          <a
            rel="noreferrer"
            target="_blank"
            className="social-icon"
            href={`${props?.data?.cv?.links[i]?.url}`}
          >
            <i class="fab fa-youtube"></i>
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
        <p>Ecole: {etablishment}</p>

        <p className="lead mb-5">{data?.bio}</p>
        <div className="social-icons d-flex">
          <Fb />
          <Git />
          <Ln />
          <Yt />
        </div>
      </div>
    </section>
  );
};
export default About;
