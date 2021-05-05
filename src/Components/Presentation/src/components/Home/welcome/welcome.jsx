import React, { useState, useEffect, useRef } from "react";
import img2 from "./assets/img/clients/client-2.png";
import img3 from "./assets/img/clients/client-3.png";
import img4 from "./assets/img/clients/client-4.png";
import img5 from "./assets/img/clients/client-5.png";
import img6 from "./assets/img/clients/client-6.png";
import img7 from "./assets/img/clients/client-7.png";
import img8 from "./assets/img/clients/client-8.png";
import { useHistory } from "react-router-dom";

import imgbanner from "./img/banner.jpeg";
import imgvideo from "./assets1/img/about.jpg";
import Slider from "react-slick";
import welcomecss from "./welcome.module.css";
import { Link } from "react-router-dom";
import FooterPage from "../../../../../Footer/FooterPage";
import "./welcome.css";
import headpng from "./assets/img/ecoles.jpeg"; 
//import "./assets1/js/main.js";
//import "./assets/css/style.css";  
import GroupIcon from '@material-ui/icons/Group';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Aos from "aos";
import "aos/dist/aos.css";
import AssignmentIcon from "@material-ui/icons/Assignment";
import authHeader from "../../../../../../services/authHeader";

export default function Welcome() {
  const history = useHistory();
  const settings = {
    slidesToShow: 4,
    slideToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 2,
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
    console.log(authHeader());
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  return (
    <>
      <div className="landing">
        <div className={welcomecss.s1}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1">
                <div className={welcomecss.s10}>
                  <h1>La <span>1<span>ère</span></span> Edition du Forum Virtuel de L’Université Ibn Tofail</h1>
                  <h5>Sous le thème</h5>
                  <h2>Le rôle du digitale à l’université pour une meilleur ouverture des lauréats & étudiants</h2>
                  <div className={welcomecss.dlgflex}>
                    <a href="#about" className={welcomecss.btngetstarted}>Plus de détails</a>
                    <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" className={welcomecss.btnwatchvideo} data-vbtype="video" data-autoplay="true"> Regarder la vidéo <i className="far fa-play-circle"></i></a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 order-1 order-lg-2 gtco-feature">
                <div className="container-fluid gtco-feature">
                  <div className={welcomecss.cover}>
                    <div className={welcomecss.card}>


                      <svg className={welcomecss.backbg} width="100%" viewBox="0 0 900 700">
                        <defs>
                          <linearGradient id="PSgrad_01" x1="64.279%" x2="0%" y1="76.604%" y2="0%">
                            <stop offset="0%" stop-color="rgb(250,236,246)" stop-opacity="1" />
                            <stop offset="100%" stop-color="rgb(250,236,246)" stop-opacity="1" />
                          </linearGradient>
                        </defs>
                        <path fill-rule="evenodd" opacity="0.102" fill="url(#PSgrad_01)"
                          d="M616.656,2.494 L89.351,98.948 C19.867,111.658 -16.508,176.639 7.408,240.130 L122.755,546.348 C141.761,596.806 203.597,623.407 259.843,609.597 L697.535,502.126 C748.221,489.680 783.967,441.432 777.751,392.742 L739.837,95.775 C732.096,35.145 677.715,-8.675 616.656,2.494 Z" />
                      </svg>

                      <svg className="svg2" width="100%" viewBox="0 0 700 500">
                        <clipPath id="clip-path">
                          <path d="M89.479,0.180 L512.635,25.932 C568.395,29.326 603.115,76.927 590.357,129.078 L528.827,380.603 C518.688,422.048 472.661,448.814 427.190,443.300 L73.350,400.391 C32.374,395.422 -0.267,360.907 -0.002,322.064 L1.609,85.154 C1.938,36.786 40.481,-2.801 89.479,0.180 Z"></path>
                        </clipPath>

                        <image clip-path="url(#clip-path)" href={imgbanner} width="100%"
                          height="465" class="svg__image"></image>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <section id="cliens" className="cliens">
          <div className="container">
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
              <h2>L'université en chiffre</h2>
            </div>
            <div className="row justify-content-end">
              <div className="col-lg-11">
                <div className="row justify-content-end">
                  <div className="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
                    <div className="count-box py-5">
                      <i className="icony icofont-university"><AccountBalanceIcon /></i>
                      <span data-toggle="counter-up">11</span>
                      <p>Etablissements</p>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
                    <div className="count-box py-5">
                      <i className="icony icofont-building-alt"><i class="far fa-building"></i></i>
                      <span data-toggle="counter-up">8</span>
                      <p>Centres</p>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
                    <div className="count-box pb-5 pt-0 pt-lg-5">
                      <i className="icony icofont-teacher"><i class="fas fa-user-tie"></i></i>
                      <span data-toggle="counter-up">620</span>
                      <p>Engeignants</p>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
                    <div className="count-box pb-5 pt-0 pt-lg-5">
                      <i className="icony icofont-group"> <GroupIcon /></i>

                      <span data-toggle="counter-up">63458</span>
                      <p>Etudiants</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="row">

              <div className="col-lg-6 video-box align-self-baseline">
                <img src={imgvideo} className="img-fluid" alt="" />
                <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" className="venobox play-btn mb-4" data-vbtype="video" data-autoplay="true"></a>
              </div>

              <div className="col-lg-6 pt-3 pt-lg-0 content">
                <div className="section-title">
                  <h2>Présentation</h2>
                </div>
                <p>La première édition du Forum Virtuel de l’Université Ibn Tofail est l’occasion de rapprocher le monde académique au monde professionnel, ainsi contribuer à renforcer le rôle de l’université dans son environnement.</p>
                <p>Cette organisation en mode virtuel, est un témoignage de l’adoption de l’université des moyens digital pour à la fois faciliter aux entreprises et l’étudiant cette rencontre, qui pourrait être une préparation aux versions présentielles organisées par les
                  différents établissements de l’Université Ibn Tofail.</p>

              </div>

            </div>

          </div>
        </section>
        <section id="our-values" className="our-values">
          <div className="container">
            <div className="section-title">
              <h2>Espaces </h2>
            </div>
            <div className="row">
              <div className="col-md-6 d-flex align-items-stretch">
                <div className="card" >
                  <div className="card-body">
                    <h5 className="card-title"><a href="">E-Entreprise</a></h5>
                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua.</p>
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push("/login");
                      }}
                      
                      className="cta-btn"
                    >
                      Se connecter
                    </Link><br/>
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
                <div className="card1"  >
                  <div className="card-body">
                    <h5 className="card-title"><a href="">E-Etudiant</a></h5>
                    <p className="card-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem doloremque laudantium, totam rem.</p>
                    
                    
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push("/login");
                      }}
                      
                      className="cta-btn"
                    >
                      Se connecter
                    </Link><br/>
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
        <section id="clients" className="wow fadeInUp">
          <div className="container">
            <div className="section-header">
              <h2>Partenaires académiques</h2>
            </div>

            <Slider {...settings}>
              <div className="slide">
                <img className="stand" src={img2} alt="" />

              </div>
              <div className="slide">
                <img className="stand" src={img3} alt="" />


              </div>
              <div className="slide">
                <img className="stand" src={img4} alt="" />


              </div>
              <div className="slide">
                <img className="stand" src={img5} alt="" />


              </div>
              <div className="slide">
                <img className="stand" src={img6} alt="" />

              </div>
              <div className="slide">
                <img className="stand" src={img7} alt="" />

              </div>
              <div className="slide">
                <img className="stand" src={img8} alt="" />

              </div>

            </Slider>

          </div>
        </section>


        <section id="clients" className="wow fadeInUp">
          <div className="container">
            <div className="section-header">
              <h2>Partenaires Professionnels</h2>
            </div>

            <Slider {...settings}>
              <div className="slide">
                <img className="stand" src={img2} alt="" />

              </div>
              <div className="slide">
                <img className="stand" src={img3} alt="" />


              </div>
              <div className="slide">
                <img className="stand" src={img4} alt="" />


              </div>
              <div className="slide">
                <img className="stand" src={img5} alt="" />


              </div>
              <div className="slide">
                <img className="stand" src={img6} alt="" />

              </div>
              <div className="slide">
                <img className="stand" src={img7} alt="" />

              </div>
              <div className="slide">
                <img className="stand" src={img8} alt="" />

              </div>

            </Slider>
            <div className="owl-carousel clients-carousel">
              <img src="assets/img/clients/client-1.png" alt="" />
              <img src="assets/img/clients/client-2.png" alt="" />
              <img src="assets/img/clients/client-3.png" alt="" />
              <img src="assets/img/clients/client-4.png" alt="" />
              <img src="assets/img/clients/client-5.png" alt="" />
              <img src="assets/img/clients/client-6.png" alt="" />
              <img src="assets/img/clients/client-7.png" alt="" />
              <img src="assets/img/clients/client-8.png" alt="" />
            </div>

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
        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-3">
                <div className="footer-contact">
                  <h2>HNA LOGO</h2>
                  <hr />
                  <p className="pp">Le Forum Annuel Virtuel De L’Université Ibn Tofail est d’une part un moment d’échange et d’ouverture de l’université sur son environnement régional et national, puis d’autre part, c’est un moment ou le lauréat et étudiant se positionne et se projette.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="footer-link">
                  <h2>Allez </h2>
                  <a href=""><i class="fas fa-caret-right"></i>Accueil</a>
                  <a href=""><i class="fas fa-caret-right"></i>A propos</a>
                  <a href=""><i class="fas fa-caret-right"></i>Partenaires</a>
                  <a href=""><i class="fas fa-caret-right"></i>Contactez-nous</a>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="footer-link">
                  <h2>Liens utiles</h2>
                  <a href=""><i class="fas fa-caret-right"></i>Université IBN tofail </a>
                  <a href=""><i class="fas fa-caret-right"></i>ENSA- KENITRA</a>
                  <a href=""><i class="fas fa-caret-right"></i>ENCG- KENITRA</a>
                  <a href=""><i class="fas fa-caret-right"></i>FSJES- KENITRA</a>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="footer-contact">
                  <h2>Nous contacter</h2>
                  <p><i className="fa fa-map-marker-alt"></i>&nbsp;Campus universitaire, B.P 241, Kénitra - 14 000 - Maroc</p>
                  <p><i className="fa fa-phone-alt"></i>&nbsp;+212 6 29 10 21 64</p>
                  <p><i className="fa fa-envelope"></i>&nbsp;info@example.com</p>

                  <h2 className="hh">Nous suivre</h2>
                  <div className="footer-social">
                    <a href=""><i class="fab fa-twitter"></i></a>
                    <a href=""><i class="fab fa-facebook-f"></i></a>
                    <a href=""><i class="fab fa-youtube"></i></a>
                    <a href=""><i class="fab fa-instagram"></i></a>
                    <a href=""><i class="fab fa-linkedin-in"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container footer-menu">
            <div className="f-menu">
              <a href="">E-ENTREPRISE</a>
              <a href="">E-ETUDIANT</a>
            </div>
          </div>
          <div className="container copyright">
            <div className="row">
              <div className="col-md-6">
                <p>&copy; <a href="#">2021 FORUM Université IBN TOFAIL</a>. Tous droits réservés</p>
              </div>
            </div>
          </div>
        </div>


      </div>


    </>
  );
}