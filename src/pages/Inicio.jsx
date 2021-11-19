import React, { useEffect, useState } from "react";
import { TEXTS_SLIDES } from "../constants/global";
import HeaderInicio from "../layout/components/HeaderInicio";
import Carousel from "./../components/organism/Carousel";

const Inicio = () => {
  const [carousel, setCarousel] = useState({});

  const nextSlide = () => {
    let max = TEXTS_SLIDES.length - 1;
    let position = TEXTS_SLIDES.indexOf(carousel);
    let newVale = position + 1 > max ? 0 : position + 1;
    setCarousel(TEXTS_SLIDES[newVale]);
  };

  const prevSlide = () => {
    let max = TEXTS_SLIDES.length - 1;
    let position = TEXTS_SLIDES.indexOf(carousel);
    let prevValue = position - 1 < 0 ? max : position - 1;
    setCarousel(TEXTS_SLIDES[prevValue]);
  };

  useEffect(() => {
    setCarousel(TEXTS_SLIDES[0]);
  }, []);
  return (
    <div className="inicio">
      <div className="main-header">
        <HeaderInicio />
        <Carousel
          slide={carousel}
          nextSlide={() => nextSlide()}
          prevSlide={() => prevSlide()}
        />
      </div>
      <section className="card">
        <div className="card-content">
          <div className="card__item">
            <i class="fas fa-users"></i>
            <h3>Próposito</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
              cumque asperiores ab cum inventore excepturi atque laborum
            </p>
          </div>
          <div className="card__item">
            <i class="fas fa-users"></i>
            <h3>Próposito</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
              cumque asperiores ab cum inventore excepturi atque laborum
            </p>
          </div>
          <div className="card__item">
            <i class="fas fa-users"></i>
            <h3>Próposito</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
              cumque asperiores ab cum inventore excepturi atque laborum
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;
