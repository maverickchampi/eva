import React from "react";
import logo from "./../../assets/icons/eva_logo_c.png";

const HeaderInicio = () => {
  return (
    <header className="header-inicio">
      <div className="header__contenedor">
        <img src={logo} alt="logo eva" />
        <ul className="nav">
          <li>
            <a>Nosotros</a>
          </li>
          <li>
            <a>Objetivos</a>
          </li>
          <li>
            <a>Faq</a>
          </li>
        </ul>
        <div className="botones">
          <div className="off">Iniciar Sesión</div>
          <div className="on">Registrar</div>
        </div>
      </div>
    </header>
  );
};

export default HeaderInicio;
