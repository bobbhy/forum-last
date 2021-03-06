import React, { useState, useEffect, useRef } from "react";
import img1 from "./assets/img/clients/client-1.png";
import imgc1 from "./assets/img/clubs/club-1.png";
import imgc2 from "./assets/img/clubs/club-2.png";
import imgc3 from "./assets/img/clubs/club-3.png";
import imgc4 from "./assets/img/clubs/club-4.png";
import imgc5 from "./assets/img/clubs/club-5.png";
import imgc6 from "./assets/img/clubs/club-6.jpeg";
import imgc7 from "./assets/img/clubs/club-7.jpeg";
import imgc8 from "./assets/img/clubs/club-8.jpeg";
import imgc9 from "./assets/img/clubs/club-9.jpg";
import imgc10 from "./assets/img/clubs/club-10.jpeg";
import imgc11 from "./assets/img/clubs/club-11.jpeg";
import imgc12 from "./assets/img/clubs/club-12.jpeg";
import imgc13 from "./assets/img/clubs/club-13.jpeg";

import imgpa0 from "./assets/img/pacademiques/0.png";
import imgpa1 from "./assets/img/pacademiques/1.jpg";
import imgpa2 from "./assets/img/pacademiques/2.jpg";
import imgpa3 from "./assets/img/pacademiques/3.png";
import imgpa4 from "./assets/img/pacademiques/4.png";
import imgpa5 from "./assets/img/pacademiques/5.png";
import imgpa6 from "./assets/img/pacademiques/6.png";
import imgpa7 from "./assets/img/pacademiques/7.png";
import imgpa8 from "./assets/img/pacademiques/8.png";
import imgpa9 from "./assets/img/pacademiques/9.png";
import imgpa10 from "./assets/img/pacademiques/10.png";
import imgpa11 from "./assets/img/pacademiques/11.jpeg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from "react-router-dom";

import imgbanner from "./img/banner.jpeg";
import imgvideo from "./assets1/img/about.jpeg";
import Slider from "react-slick";
import welcomecss from "./welcome.module.css";
import { Link } from "react-router-dom";
import "./welcome.css";
import headpng from "./assets/img/ecoles1.png";
//import "./assets1/js/main.js";
//import "./assets/css/style.css";
import GroupIcon from "@material-ui/icons/Group";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Welcome() {
  const history = useHistory();
  const settings = {
    slidesToShow: 4,
    slideToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    dots: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();
  const startTimer = () => {
    const countdownDate = new Date("June 23 2021 00:00:00").getTime();
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
      <section id="home"></section>
      <div className="landing">
        <div className={welcomecss.s1}>
          <div className="container">
            <div className="row">
              <div
                className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
                id="#landing"
              >
                <div className={welcomecss.s10}>
                  <h1>
                    La premi??re ??dition du Forum Virtuel ?? l???Universit?? Ibn
                    Tofail
                  </h1>
                  <h1 className="p-3 text-center">Et</h1>
                  <h1>
                    La 7<sup>??me</sup> ??dition du Forum ENSAK-ENTREPRISES
                  </h1>
                  <h2>Le 23 et 24 Juin 2021</h2>
                  <h5>Sous le th??me</h5>
                  <h2>
                    Le digital ?? l???universit?? au service des
                    partenairess,etudiants et entreprises
                  </h2>
                  <div className={welcomecss.dlgflex}>
                    <a href="#cliens" className={welcomecss.btngetstarted}>
                      Plus de d??tails
                    </a>
                    <a
                      href="https://www.youtube.com/watch?v=x9JVGJ-_wzg"
                      target="_blank"
                      className={welcomecss.btnwatchvideo}
                      data-vbtype="video"
                      data-autoplay="true"
                    >
                      {" "}
                      Regarder la vid??o <i className="far fa-play-circle"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 order-1 order-lg-2 gtco-feature">
                <div className="container-fluid gtco-feature">
                  <div className={welcomecss.cover}>
                    <div className={welcomecss.card}>
                      <svg
                        className={welcomecss.backbg}
                        width="100%"
                        viewBox="0 0 900 700"
                      >
                        <defs>
                          <linearGradient
                            id="PSgrad_01"
                            x1="64.279%"
                            x2="0%"
                            y1="76.604%"
                            y2="0%"
                          >
                            <stop
                              offset="0%"
                              stop-color="rgb(250,236,246)"
                              stop-opacity="1"
                            />
                            <stop
                              offset="100%"
                              stop-color="rgb(250,236,246)"
                              stop-opacity="1"
                            />
                          </linearGradient>
                        </defs>
                        <path
                          fill-rule="evenodd"
                          opacity="0.102"
                          fill="url(#PSgrad_01)"
                          d="M616.656,2.494 L89.351,98.948 C19.867,111.658 -16.508,176.639 7.408,240.130 L122.755,546.348 C141.761,596.806 203.597,623.407 259.843,609.597 L697.535,502.126 C748.221,489.680 783.967,441.432 777.751,392.742 L739.837,95.775 C732.096,35.145 677.715,-8.675 616.656,2.494 Z"
                        />
                      </svg>

                      <svg className="svg2" width="100%" viewBox="0 0 700 500">
                        <clipPath id="clip-path">
                          <path d="M89.479,0.180 L512.635,25.932 C568.395,29.326 603.115,76.927 590.357,129.078 L528.827,380.603 C518.688,422.048 472.661,448.814 427.190,443.300 L73.350,400.391 C32.374,395.422 -0.267,360.907 -0.002,322.064 L1.609,85.154 C1.938,36.786 40.481,-2.801 89.479,0.180 Z"></path>
                        </clipPath>

                        <image
                          clip-path="url(#clip-path)"
                          href={imgbanner}
                          width="100%"
                          height="465"
                          class="svg__image"
                        ></image>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="cliens" className="cliens" id="cliens">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 col-md-14 col-16 d-flex align-items-center justify-content-center">
                <img src={headpng} class="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section id="about1" className="about">
          <div className="container" data-aos="fade-up">
            <div className="section-titleleft">
              <h2>L'universit?? en chiffre</h2>
            </div>
            <div className="row justify-content-end">
              <div className="col-lg-11">
                <div className="row justify-content-end">
                  <div className="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
                    <div className="count-box py-5">
                      <i className="icony icofont-university">
                        <AccountBalanceIcon />
                      </i>
                      <span data-toggle="counter-up">11</span>
                      <p>Etablissements</p>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
                    <div className="count-box py-5">
                      <i className="icony icofont-building-alt">
                        <i class="far fa-building"></i>
                      </i>
                      <span data-toggle="counter-up">8</span>
                      <p>Centres</p>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
                    <div className="count-box pb-5 pt-0 pt-lg-5">
                      <i className="icony icofont-teacher">
                        <i class="fas fa-user-tie"></i>
                      </i>
                      <span data-toggle="counter-up">620</span>
                      <p>Engeignants</p>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
                    <div className="count-box pb-5 pt-0 pt-lg-5">
                      <i className="icony icofont-group">
                        {" "}
                        <GroupIcon />
                      </i>

                      <span data-toggle="counter-up">63458</span>
                      <p>Etudiants</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 video-box align-self-baseline">
                <img src={imgvideo} className="img-fluid imgvideo" alt="" />
                <a
                  href="https://www.youtube.com/watch?v=x9JVGJ-_wzg"
                  className="venobox play-btn mb-4"
                  data-vbtype="video"
                  data-autoplay="true"
                ></a>
              </div>

              <div className="col-lg-6 pt-3 pt-lg-0 content">
                <div className="section-title">
                  <h2>Pr??sentation</h2>
                </div>
                <p className="mt-4">
                  La premi??re ??dition du Forum Virtuel ?? l???Universit?? Ibn Tofail
                  et la 7 ??me ??dition du Forum ENSAK- ENTREPRISES sont des
                  occasions de promouvoir l???ouverture du monde acad??mique sur le
                  monde professionnel et de contribuer ?? l???ancrage de
                  l???universit?? dans son environnement ??conomique avec un
                  partenariat win-win entre les deux parties.
                </p>
                <p>
                  Cette organisation en mode virtuel traduit l???engagement de
                  l???universit?? sur la voie digitale pour faciliter la rencontre
                  entre l???entreprise et l?????tudiant. Elle pourra servir de
                  pr??lude aux versions pr??sentielles ?? organiser par les
                  diff??rents ??tablissements de l???Universit?? Ibn Tofail.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="our-values" className="our-values">
          <div className="container Espaces">
            <div className="section-title">
              <h2>Espaces </h2>
            </div>
            <div className="row mt-5 p-3">
              <div className="col-md-6 d-flex align-items-stretch">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      <a href="">E-Entreprise</a>
                    </h5>
                    <p className="card-text">
                      Vous ??tes responsable RH dans une entreprise et vous
                      cherchez ?? recruter un ??tudiant ?? l'universit?? Ibn Tofail,
                      la plateforme vous offre l???opportunit?? de trouver votre
                      cible.
                    </p>
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push("/login");
                      }}
                      className="cta-btn"
                    >
                      Se connecter
                    </Link>
                    <br />
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push("/register");
                      }}
                      className="cta-btn2"
                    >
                      S'inscrire
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                <div className="card1">
                  <div className="card-body">
                    <h5 className="card-title">
                      <a href="">E-Etudiant</a>
                    </h5>
                    <p className="card-text">
                      Vous ??tes ??tudiant ?? l'universit?? Ibn Tofail, la
                      plateforme est l???outil idoine pour renforcer vos chances
                      de d??crocher votre emploi ou votre stage.
                    </p>
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push("/login");
                      }}
                      className="cta-btn"
                    >
                      Se connecter
                    </Link>
                    <br />
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push("/register");
                      }}
                      className="cta-btn2"
                    >
                      S'inscrire
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="clients" className="container p-4 wow fadeInUp">
          <div className="container" id="partenairess">
            <div className="section-header">
              <h2>Partenaires professionnels</h2>
            </div>

            <Slider {...settings}>
              <div className="slide">
                <img className="stand" src={img1} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={img1} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={img1} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={img1} alt="" />
              </div>
            </Slider>
          </div>
          <div className="container">
            <div className="section-header">
              <h2>Partenaires acad??miques</h2>
            </div>

            <Slider {...settings}>
              <div className="slide">
                <img className="stand" src={imgpa0} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgpa1} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgpa2} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgpa3} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgpa4} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgpa5} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgpa6} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgpa7} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgpa8} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgpa9} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgpa10} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgpa11} alt="" />
              </div>
            </Slider>
          </div>
          <div className="container">
            <div className="section-header">
              <h2>Clubs</h2>
            </div>

            <Slider {...settings}>
              <div className="slide">
                <img className="stand" src={imgc1} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgc2} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgc3} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgc4} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgc5} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgc6} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgc7} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgc8} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgc9} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgc10} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgc11} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgc12} alt="" />
              </div>
              <div className="slide">
                <img className="stand" src={imgc13} alt="" />
              </div>
            </Slider>
          </div>
        </section>
        <div className="parallax">
          <div className="parallax_box">
            <div
              className="parallax_timer"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <p className="number">{timerDays}</p>
              <p className="text">jours</p>
            </div>
            <div
              className="parallax_timer"
              data-aos="fade-up"
              data-aos-duration="1300"
            >
              <p className="number">{timerHours}</p>
              <p className="text">heures</p>
            </div>
            <div
              className="parallax_timer"
              data-aos="fade-up"
              data-aos-duration="1600"
            >
              <p className="number">{timerMinutes}</p>
              <p className="text">minutes</p>
            </div>
            <div
              className="parallax_timer"
              data-aos="fade-up"
              data-aos-duration="1900"
            >
              <p className="number">{timerSeconds}</p>
              <p className="text">secondes</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
