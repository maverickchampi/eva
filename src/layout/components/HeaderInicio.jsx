import React from "react";
import { Link } from "react-router-dom";
import logo from "./../../assets/icons/eva_logo_c.png";

const HeaderInicio = () => {
  return (
    <header className="header-inicio">
      <div className="header__contenedor">
        <img src={logo} alt="logo eva" />
        {/* <ul className="nav">
          <li>
            <a className="active">Inicio</a>
          </li>
          <li>
            <a>Nosotros</a>
          </li>
          <li>
            <a>Objetivos</a>
          </li>
          <li>
            <a>Convenios</a>
          </li>
        </ul> */}
        <div className="botones">
          <Link to="/login" className="off">
            Iniciar Sesión
          </Link>
          <Link to="/registro" className="on">
            Registrar
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderInicio;
