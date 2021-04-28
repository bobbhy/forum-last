import React from "react";
import "./sponsor.css";
import img1 from "./img/Orange.png";
import img2 from "./img/nike.png";
import img3 from "./img/cih.png";
import img4 from "./img/PSA.png";
import img5 from "./img/ALTEN.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FooterPage from "../../../../../../Components/Footer/FooterPage"

export default function Sponsor() {
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
  return (
    <div>
      <div>
        <div className="intro">
          <div className="introText">
            <h1>
              Our &nbsp;
              <span style={{ color: "#0099ff" }}>Sponsors</span>
            </h1>
          </div>
        </div>
        <div className="partner_section">
          <Slider {...settings}>
            <div className="slide">
              <img className="imagery" src={img1} alt="" />
            </div>
            <div className="slide">
              <img className="imagery" src={img2} alt="" />
            </div>
            <div className="slide">
              <img className="imagery" src={img3} alt="" />
            </div>
            <div className="slide">
              <img className="imagery" src={img4} alt="" />
            </div>
            <div className="slide">
              <img className="imagery" src={img5} alt="" />
            </div>
          </Slider>
        </div>
      </div>
      <FooterPage />
    </div>
  );
}
