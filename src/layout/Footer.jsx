import React from "react";
import logo from "../assets/images/eva_logo_c.png";

const Footer = () => {
  return (
    <footer className="pie-pagina">
      <div className="grupo-1">
        <div className="box">
          <figure>
            <a href="#">
              <img src={logo} alt="Logo de EVA" />
            </a>
          </figure>
        </div>
        <div className="box">
          <h2>SOBRE NOSOTROS</h2>
          <p>
            EVA (Emotional Virtual Assistant) es un proyecto creado con la
            finalidad de poder brindarle al usuario una mejor evaluación con
            registro de las emociones y estados de ánimo
          </p>
        </div>
        <div className="box">
          <h2>SIGUENOS</h2>
          <div className="red-social">
            <a href="#" className="fa fa-facebook"></a>
            <a href="#" className="fa fa-instagram"></a>
            <a href="#" className="fa fa-twitter"></a>
            <a href="#" className="fa fa-youtube"></a>
          </div>
        </div>
      </div>
      <div className="grupo-2">
        <small>
          &copy; 2021 <b>EVA</b> - Todos los Derechos Reservados.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
