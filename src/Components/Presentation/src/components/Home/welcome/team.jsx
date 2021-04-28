import React, { useEffect } from "react";
import img1 from "./img/team-meeting.png";
import img2 from "./img/collabo1.png";
import img3 from "./img/collabo2.png";
import img4 from "./img/collabo3.png";
import "./team.css";
import Aos from "aos";
import "aos/dist/aos.css";
import FooterPage from "../../../../../../Components/Footer/FooterPage";

export default function Team() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div>
      <div className="intro">
        <div className="introText" data-aos="fade-up" data-aos-duration="1000">
          <h1>
            About our <br />
            <span style={{ color: "#0099ff" }}>Team.</span>
          </h1>
        </div>
        <div
          className="introImage"
          data-aos="fade-down"
          data-aos-duration="2000"
        >
          <img src={img1} alt="" />
        </div>
      </div>
      <div className="space"></div>
      <div className="about_container">
        <div className="about-flex">
          <div className="about-card one">
            <div className="about-img">
              <img src={img2} alt="" />
            </div>

            <div className="about-text">
              <h4>Aymane El Mouhtarim</h4>
              <p>lorem ipsum</p>
            </div>
          </div>
          <div className="about-card">
            <div className="about-img two">
              <img src={img3} alt="" />
            </div>

            <div className="about-text">
              <h4>Saad Errazgouni</h4>
              <p>lorem ipsum.</p>
            </div>
          </div>
          <div className="about-card three">
            <div className="about-img">
              <img src={img4} alt="" />
            </div>

            <div className="about-text">
              <h4>Taha Lahrizi</h4>
              <p>lorem ipsum.</p>
            </div>
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
                                <p><i className="fa fa-map-marker-alt"></i>campus universitaire, B.P 241, Kénitra - 14 000 - Maroc</p>
                                <p><i className="fa fa-phone-alt"></i>+212 6 29 10 21 64</p>
                                <p><i className="fa fa-envelope"></i>info@example.com</p>

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
  );
}
