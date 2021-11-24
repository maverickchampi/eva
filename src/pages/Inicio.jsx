import React, { useEffect, useState } from "react";
import {
  TEXTS_CONVENIOS,
  TEXTS_OBJETIVOS,
  TEXTS_SLIDES,
  TEXTS_SLIDES_CARD,
} from "../constants/global";
import FooterInicio from "../layout/components/FooterInicio";
import HeaderInicio from "../layout/components/HeaderInicio";
import Carousel from "./../components/organism/Carousel";

const Inicio = () => {
  const [carousel, setCarousel] = useState(TEXTS_SLIDES[0]);

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
    if (document.getElementsByClassName("WACLauncher__Button").length !== 0) {
      for (
        let i = 0;
        i < document.getElementsByClassName("WACLauncher__Button").length;
        i++
      ) {
        document
          .getElementsByClassName("WACLauncher__Button")
          [i].classList.add("d-none");
      }
    }
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
          {TEXTS_SLIDES_CARD.map((item, index) => {
            return (
              <div className="card__item" key={index}>
                <i className={item.icon}></i>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
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
        <h3>
          <span>Objetivos</span>
        </h3>
        <div className="objetivos-content">
          <div className="objetivos-principal">
            <h2>¿Por qué son importante las emociones?</h2>
            <p>
              Nos permiten orientar nuestras acciones de una manera eficaz,
              además nos entregan conocimientos respecto a nuestro entorno y de
              nosotros mismos, permitiendo la toma de decisiones ante diferentes
              situaciones que estemos pasando.
            </p>
            <img
              src="https://i.ibb.co/z4Nb05t/objetivos.png"
              alt="importancia emocional"
            />
          </div>
          <div className="objetivos-descripcion">
            {TEXTS_OBJETIVOS.map((item, index) => {
              return (
                <div className="objetivos-card" key={index}>
                  <div className="image">
                    <i className={item.icon}></i>
                  </div>
                  <div className="content">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="convenios main">
        <h3>
          <span>Convenios</span>
        </h3>
        <div className="convenios-content">
          {TEXTS_CONVENIOS.map((item, index) => {
            return (
              <div className="convenios__item" key={index}>
                <a href={item.url} target="_blank">
                  <img src={item.image} alt={item.name} />
                </a>
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
      </section>
      <FooterInicio />
    </div>
  );
};

export default Inicio;
