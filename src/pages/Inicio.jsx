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
              cumque asperiores ab cum inventore
            </p>
          </div>
        </div>
      </section>
      <section className="nosotros main">
        <img alt="fondo" src="https://i.ibb.co/BLVMP60/eva-questions.png" />
        <div className="nosotros-content">
          <h2>¿Qué es Eva?</h2>
          <p>
            EVA (Emotional Virtual Assistant) es un proyecto creado con la
            finalidad de poder brindarle al usuario una mejor evaluación con
            registro de las emociones y estados de ánimo, y posibles respuestas
            a los problemas emocionales que pueda estar teniendo.
          </p>
        </div>
      </section>
      <section className="objetivos main">
        <div className="objetivos-principal">
          <h2>¿Qué es Eva?</h2>
          <p>
            EVA (Emotional Virtual Assistant) es un proyecto creado con la
            finalidad de poder brindarle al usuario una mejor evaluación con
            registro de las emociones y estados de ánimo, y posibles respuestas
            a los problemas emocionales que pueda estar teniendo, además, de
            compartir con otras personas que estén pasando por la misma
            situación.
          </p>
        </div>
        <div className="objetivos-descripcion">
          <div className="objetivos-card">
            <div className="image">
              <i class="fas fa-users"></i>
            </div>
            <div className="content">
              <h3>Nombre</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                nihil, quo eum vitae unde laborum eaque eveniet explicabo ut
                tempora voluptat
              </p>
            </div>
          </div>
          <div className="objetivos-card">
            <div className="image">
              <i class="fas fa-users"></i>
            </div>
            <div className="content">
              <h3>Nombre</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                nihil, quo eum vitae unde laborum eaque eveniet explicabo ut
                tempora voluptate
              </p>
            </div>
          </div>
          <div className="objetivos-card">
            <div className="image">
              <i class="fas fa-users"></i>
            </div>
            <div className="content">
              <h3>Nombre</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                nihil, quo eum vitae unde laborum eaque eveniet explicabo ut
                tempora voluptate
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;
