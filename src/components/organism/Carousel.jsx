import React from "react";
import { Link } from "react-router-dom";

const Carousel = ({ slide, nextSlide, prevSlide }) => {
  return (
    <div className="slides-container">
      <div className="slide__item active">
        <div className="content">
          <span>{slide.subtitle}</span>
          <h3>{slide.title}</h3>
          <Link className="link" to={slide.urlButton || ""}>
            {slide.nameButton}
          </Link>
        </div>
        <img src={slide?.image} alt={slide.image} />
      </div>
      <div className="slide-button">
        <i
          id="prev-slide"
          className="fas fa-angle-left"
          onClick={prevSlide}
        ></i>
        <i
          id="next-slide"
          className="fas fa-angle-right"
          onClick={nextSlide}
        ></i>
      </div>
    </div>
  );
};

export default Carousel;
