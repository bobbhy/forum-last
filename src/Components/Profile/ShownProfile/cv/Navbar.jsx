import React from "react";
import "./Navbar.css";
// import authHeader from "../../../../services/authHeader.js";
const Navabar = (props) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary "
      id="sideNav"
    >
      <a className="navbar-brand js-scroll-trigger" href="#page-top">
        <span className="d-none d-lg-block">
          <img
            className="img-profile rounded-circle mx-auto mb-2"
            src={props.image}
            alt=""
          />
        </span>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" href={`${window.location.pathname}#about`}>
              About
            </a>
          </li>
          {props.isExperience && (<li className="nav-item">
            <a className="nav-link js-scroll-trigger" href={`${window.location.pathname}#experience`}>
              Experience
            </a>
          </li>)}

          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" href={`${window.location.pathname}#education`}>
              Education
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" href={`${window.location.pathname}#skills`}>
              Skills
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" href={`${window.location.pathname}#interests`}>
              Interests
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link js-scroll-trigger" href={`${window.location.pathname}#awards`}>
              Awards
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navabar;
