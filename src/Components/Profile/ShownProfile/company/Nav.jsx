import React from "react";

const Nav = (props) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary"
      id="sideNav"
    >
      <a className="navbar-brand js-scroll-trigger" href="#page-top">
        <span className="d-none d-lg-block">
          <img
            className="img-fluid img-profile square mx-auto mb-2"
            src={props?.image}
            alt=""
          />
        </span>
      </a>

      <div
        className="collapse navbar-collapse"
        id="navbarSupportedContent"
      ></div>
    </nav>
  );
};
export default Nav;
