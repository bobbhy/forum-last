import React from "react";
import styles from "./FooterPage.module.css";
import { Link } from "react-router-dom";
import logo from "../../logo.png";
const FooterPage = () => {
  return (
    <div className={styles.site_footer}>
      <div className={styles.container}>
        <div className={styles.grid_container}>
          <div className={styles.grid_item}>
            <Link to="/">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
          </div>
          <div className={styles.grid_item + " " + styles.inner_grid_container}>
            <div className={styles.grid_item}>
              <a href>About Us</a>
            </div>
            <div className={styles.grid_item}>
              <a href>Health and Social Care</a>
            </div>
            <div className={styles.grid_item}>
              <a href>Privacy Policy</a>
            </div>
            <div className={styles.grid_item}>
              <a href>Blog</a>
            </div>
            <div className={styles.grid_item}>
              <a href>Contact us</a>
            </div>
            <div className={styles.grid_item}>
              <a href>Finance</a>
            </div>
            <div className={styles.grid_item}>
              <a href>Cookie Policy</a>
            </div>
            <div className={styles.grid_item}>
              <a href>Jobs</a>
            </div>
          </div>
          <div className={styles.grid_item}>
            <div className={styles.social_buttons}>
              <a href>
                <i className={"fab fa-instagram " + styles.circle_icon} />
              </a>
              <a href>
                <i className={"fab fa-facebook " + styles.circle_icon} />
              </a>
              <a href>
                <i className={"fab fa-linkedin-in " + styles.circle_icon} />
              </a>
              <a href>
                <i className={"fab fa-twitter " + styles.circle_icon} />
              </a>
            </div>
          </div>
        </div>
        <hr />
        <p>
          Copyright © 2021 | DEVZ Ltd | DEVZ Resourcing | DEVZ Health ltd All
          rights reserved
        </p>
      </div>
    </div>
  );
};

export default FooterPage;
