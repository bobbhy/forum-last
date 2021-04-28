import React, { useState, useEffect, useRef } from "react";
import img1 from "./img/person-png.png";
import img2 from "./img/haker.svg";
import img3 from "./img/mobile-testing.png";
import img4 from "./img/next.png";
import img5 from "./img/website-feature.png";
import img6 from "./img/sharing.png";
import img7 from "./img/reverse-wave.svg";
import background from "./img/ensak.jpg";
import { Link } from "react-router-dom";

import "./welcome.css";
import Aos from "aos";
import "aos/dist/aos.css";
import AssignmentIcon from "@material-ui/icons/Assignment";

export default function Welcome() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();
  const startTimer = () => {
    const countdownDate = new Date("May 30 2021 00:00:00").getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        //stop timer
        clearInterval(interval.current);
      } else {
        //update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };
  // componentDidMount
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  return (
    <>
      <div className="landing">
        <div
          className="landingText"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1>
            Welcome <span>to league of draven.</span>
          </h1>
          <h3>lorem*</h3>
          <div className="btn ">
            <Link to="/login">Sign In</Link>
          </div>
        </div>
        <div
          className="landingImage"
          data-aos="fade-down"
          data-aos-duration="2000"
        >
          <img src={img2} alt="" />
        </div>
      </div>

      <div className="about">
        <div className="aboutText" data-aos="fade-up" data-aos-duration="1000">
          <h1 style={{ marginLeft: "5vw" }}>
            lorem iph <br />{" "}
            <span style={{ marginLeft: "1vw", fontSize: "3vw" }}>
              To attend these <br /> seminars
            </span>{" "}
          </h1>
          <img className="about-image" src={img1} alt="" />
        </div>
        <div
          className="aboutList"
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <ol>
            <li>
              <span>
                1 <AssignmentIcon />
              </span>
              <p>lorem*</p>
            </li>
            <li>
              <span>
                2 <AssignmentIcon />
              </span>
              <p>lorem*</p>
            </li>
            <li>
              <span>
                3 <AssignmentIcon />
              </span>
              <p>lorem*</p>
            </li>
          </ol>
        </div>
      </div>
      <div className="infoSection">
        <div className="infoHeader" data-aos="fade-up" data-aos-duration="1000">
          <h1>
            Discover our <br /> <span>app.</span>{" "}
          </h1>
        </div>
        <div className="infoCards">
          <div className="card one" data-aos="fade-up" data-aos-duration="1000">
            <img
              src={img3}
              class="cardoneImg"
              alt=""
              data-aos="fade-up"
              data-aos-duration="1100"
            />
            <div className="cardbgone"></div>
            <div className="cardContent">
              <h2>Binge Watch</h2>
              <p>
                Binge-watch all your favorite TV Shows or Movies during this
                Quarantine!
              </p>
              <a href="#">
                <div className="cardBtn">
                  <img src={img4} alt="" className="cardIcon" />
                </div>
              </a>
            </div>
          </div>
          <div className="card two" data-aos="fade-up" data-aos-duration="1300">
            <img
              src={img5}
              class="cardtwoImg"
              alt=""
              data-aos="fade-up"
              data-aos-duration="1100"
            />
            <div className="cardbgtwo"></div>
            <div className="cardContent">
              <h2>Binge Watch</h2>
              <p>
                Binge-watch all your favorite TV Shows or Movies during this
                Quarantine!
              </p>
              <a href="#">
                <div className="cardBtn">
                  <img src={img4} alt="" className="cardIcon" />
                </div>
              </a>
            </div>
          </div>
          <div
            className="card three"
            data-aos="fade-up"
            data-aos-duration="1600"
          >
            <img
              src={img6}
              class="cardthreeImg"
              alt=""
              data-aos="fade-up"
              data-aos-duration="1100"
            />
            <div className="cardbgone"></div>
            <div className="cardContent">
              <h2>Binge Watch</h2>
              <p>
                Binge-watch all your favorite TV Shows or Movies during this
                Quarantine!
              </p>
              <a href="#">
                <div className="cardBtn">
                  <img src={img4} alt="" className="cardIcon" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/*banner and footer 
            <div className="banner" >
                <div className="bannerText">
                    <h1></h1>
                </div>

            </div>
           */}
      <div className="parallax">
        <div className="parallax_box">
          <div
            className="parallax_timer"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <p className="number">{timerDays}</p>
            <p className="text">day</p>
          </div>
          <div
            className="parallax_timer"
            data-aos="fade-up"
            data-aos-duration="1300"
          >
            <p className="number">{timerHours}</p>
            <p className="text">hour</p>
          </div>
          <div
            className="parallax_timer"
            data-aos="fade-up"
            data-aos-duration="1600"
          >
            <p className="number">{timerMinutes}</p>
            <p className="text">minute</p>
          </div>
          <div
            className="parallax_timer"
            data-aos="fade-up"
            data-aos-duration="1900"
          >
            <p className="number">{timerSeconds}</p>
            <p className="text">seconde</p>
          </div>
        </div>
      </div>
      <div class="footer">
        <h2>LOGO</h2>
        <div class="footerlinks">
          <a href="#" class="mainlink">
            Corona Updates
          </a>
          <Link to="/help">Help</Link>
          <Link to="/team">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </>
  );
}
