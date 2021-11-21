import React from "react";
import { Link } from "react-router-dom";
import logo from "./../../assets/icons/eva_logo_c.png";

const FooterInicio = () => {
  return (
    <footer className="footer">
      <div className="footer-content main">
        <div className="footer__item">
          <Link to="">
            <img src={logo} alt="Logo de EVA" />
          </Link>
        </div>
        <div className="footer__item">
          <h2>SOBRE NOSOTROS</h2>
          <p>
            EVA (Emotional Virtual Assistant) es un proyecto creado con la
            finalidad de poder brindarle al usuario una mejor evaluación con
            registro de las emociones y estados de ánimo
          </p>
        </div>
        <div className="footer__item">
          <h2>SÍGUENOS</h2>
          <div className="red-social">
            <a href="#" className="fa fa-facebook"></a>
            <a href="#" className="fa fa-instagram"></a>
            <a href="#" className="fa fa-twitter"></a>
            <a href="#" className="fa fa-youtube"></a>
          </div>
        </div>
      </div>
      <div className="footer-derechos">
        <small>
          &copy; 2021 <b>EVA</b> - Todos los Derechos Reservados.
        </small>
      </div>
    </footer>
  );
};

export default FooterInicio;
