import React, { useEffect } from "react";
import img1 from "./img/aniss-moumen.jpeg";
import img2 from "./img/hassan-berragragui.jpeg";
import img3 from "./img/safouane.jpeg";
import img4 from "./img/abdo.jpeg";
import img5 from "./img/saad.jpg";
import img6 from "./img/tm1.jpg";
import "./team.css";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Team() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="w-100">
      <section id="team" class="team section-bg">
        <div class="container mt-4 mb-4" data-aos="fade-up">

          <div class="row mb-5">

            <div class="col-lg-6 ">
              <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="100">
                <div class="pic"><img src={img1} class="img-fluid" alt="" /></div>
                <div class="member-info">
                  <h4>Aniss Moumen</h4>
                  <span>Encadrant</span>
                  <p>Profeseur à l'école nationale des sciences appliquées de kenitra</p>
                  <div class="social">
                    <a href=""><i class="fab fa-twitter fa-xs" style={{ color: "#8b8ef1" }}></i></a>
                    <a href=""><i class="fab fa-facebook-f fa-xs" style={{ color: "#8b8ef1" }}></i></a>
                    <a href=""><i class="fab fa-instagram fa-xs" style={{ color: "#8b8ef1" }}></i></a>
                    <a href=""><i class="fab fa-linkedin-in fa-xs" style={{ color: "#8b8ef1" }}></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6 mt-4 mt-lg-0">
              <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="200">
                <div class="pic"><img src={img6} class="img-fluid" alt="" /></div>
                <div class="member-info">
                  <h4>Aymane El Mouhtarim</h4>
                  <span>Fullstack Developer</span>
                  <p>Eléve ingenieur à l'école nationale des sciences appliquées de kenitra</p>
                  <div class="social">
                    <a href=""><i class="fab fa-twitter fa-sm" style={{ color: "#8b8ef1" }}></i></a>
                    <a href=""><i class="fab fa-facebook-f fa-sm" style={{ color: "#8b8ef1" }}></i></a>
                    <a href=""><i class="fab fa-instagram fa-sm" style={{ color: "#8b8ef1" }}></i></a>
                    <a href=""><i class="fab fa-linkedin-in fa-sm" style={{ color: "#8b8ef1" }}></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 ">
              <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="100">
                <div class="pic"><img src={img5} class="img-fluid" alt="" /></div>
                <div class="member-info">
                  <h4>Saad Errazgouni</h4>
                  <span>Fullstack Developer</span>
                  <p>Eléve ingenieur à l'école nationale des sciences appliquées de kenitra</p>
                  <div class="social">
                    <a href=""><i class="fab fa-twitter" style={{ color: "#8b8ef1" }}></i></a>
                    <a href=""><i class="fab fa-facebook-f" style={{ color: "#8b8ef1" }}></i></a>
                    <a href=""><i class="fab fa-instagram" style={{ color: "#8b8ef1" }}></i></a>
                    <a href=""><i class="fab fa-linkedin-in" style={{ color: "#8b8ef1" }}></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6 mt-4 mt-lg-0">
              <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="200">
                <div class="pic"><img src={img2} class="img-fluid rounded" alt="" /></div>
                <div class="member-info">
                  <h4>Hassan berragragui</h4>
                  <span>Fullstack Developer</span>
                  <p>Eléve ingenieur à l'école nationale des sciences appliquées de kenitra</p>
                  <div class="social">
                    <a href=""><i class="fab fa-twitter" style={{ color: "#8b8ef1" }}></i></a>
                    <a href=""><i class="fab fa-facebook-f" style={{ color: "#8b8ef1" }}></i></a>
                    <a href=""><i class="fab fa-instagram" style={{ color: "#8b8ef1" }}></i></a>
                    <a href=""><i class="fab fa-linkedin-in" style={{ color: "#8b8ef1" }}></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6 mt-4">
              <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="300">
                <div class="pic"><img src={img3} class="img-fluid rounded" alt="" /></div>
                <div class="member-info">
                  <h4>Safouane Lammari</h4>
                  <span>Fullstack Developer</span>
                  <p>Eléve ingenieur à l'école nationale des sciences appliquées de kenitra</p>
                  <div class="social">
                    <a href=""><i class="fab fa-twitter" style={{ color: "#8b8ef1" }}></i></a>
                    <a href=""><i class="fab fa-facebook-f" style={{ color: "#8b8ef1" }}></i></a>
                    <a href=""><i class="fab fa-instagram" style={{ color: "#8b8ef1" }}></i></a>
                    <a href=""><i class="fab fa-linkedin-in" style={{ color: "#8b8ef1" }}></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 mt-4">
              <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="300">
                <div class="pic"><img src={img4} class="img-fluid" alt="" /></div>
                <div class="member-info">
                  <h4>Abdelkhalek Faik</h4>
                  <span>Mobile Developer</span>
                  <p>Eléve ingenieur à l'école nationale des sciences appliquées de kenitra</p> 
                  <div class="social">
                    <a href=""><i class="fab fa-twitter" style={{ color: "#8b8ef1" }}></i></a>
                    <a href=""><i class="fab fa-facebook-f" style={{ color: "#8b8ef1" }}></i></a>
                    <a href=""><i class="fab fa-instagram" style={{ color: "#8b8ef1" }}></i></a>
                    <a href=""><i class="fab fa-linkedin-in" style={{ color: "#8b8ef1" }}></i></a>
                  </div>
                </div>
              </div>
            </div>


          </div>

        </div>
      </section>
    </div>




  );
}
