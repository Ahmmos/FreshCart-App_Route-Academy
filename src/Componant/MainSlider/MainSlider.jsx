import React from "react";
import Slider from "react-slick";
import Slide1 from "../../assets/images/33893.jpg";
import Slide4 from "../../assets/images/fruits.jpg";
import Slide2 from "../../assets/images/electronics.png";
import Slide3 from "../../assets/images/slider-image-3.jpeg";
import Slide5 from "../../assets/images/slogan.png";

export default function MainSlider() {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <div className="container slider text-center">
      <Slider {...settings}>
        <div className="">
          <img src={Slide1} alt="" />
        </div>
        <div>
          <img src={Slide2} alt="" />
        </div>
        <div>
          <img src={Slide3} alt="" />
        </div>
        <div>
          <img src={Slide4} alt="" />
        </div>
        <div>
          <img src={Slide5} alt="" />
        </div>
      </Slider>
    </div>
  );
}
