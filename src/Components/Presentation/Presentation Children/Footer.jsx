import React from 'react'
import logo from "./logo.png";
import { Link } from "react-router-dom";
function Footer() {
    return (
        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-3">
                <div className="footer-contact">
                  <Link to="/">
                  <img src={logo} alt="logo" className="logoxx" />
                  </Link>
                  <hr />
                  <p className="pp">Le Forum Annuel Virtuel De L’Université Ibn Tofail est d’une part un moment d’échange et d’ouverture de l’université sur son environnement régional et national, puis d’autre part, c’est un moment ou le lauréat et étudiant se positionne et se projette.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="footer-link">
                  <h2>Allez </h2>
                  <a href=""><i class="fas fa-caret-right"></i>Accueil</a>
                  <a href="#cliens"><i class="fas fa-caret-right"></i>A propos</a>
                  <a href="#partenairess"><i class="fas fa-caret-right"></i>Partenaires</a>
                  <a href=""><i class="fas fa-caret-right"></i>Contactez-nous</a>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="footer-link">
                  <h2>Liens utiles</h2>
                  <a href="https://www.uit.ac.ma/"><i class="fas fa-caret-right"></i>Université IBN tofail </a>
                  <a href="https://ensa.uit.ac.ma/"><i class="fas fa-caret-right"></i>ENSA- KENITRA</a>
                  <a href="https://encg.uit.ac.ma/"><i class="fas fa-caret-right"></i>ENCG- KENITRA</a>
                  <a href="https://cdc.uit.ac.ma/"><i class="fas fa-caret-right"></i>CDC- KENITRA</a>
                  <a href="https://fsjes.uit.ac.ma/"><i class="fas fa-caret-right"></i>FSJES- KENITRA</a>
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

    )
}

export default Footer
