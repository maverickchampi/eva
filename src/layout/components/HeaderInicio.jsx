import React from "react";
import { Link } from "react-router-dom";
import { user } from "../../constants/methods";
import logo from "./../../assets/icons/eva_logo_c.png";

const HeaderInicio = () => {
  return (
    <header className="header-inicio">
      <div className="header__contenedor">
        <img src={logo} alt="logo eva" />
        <div className="botones">
          {user() ? (
            <Link to="/eva/dashboard" className="off">
              Mi dashboard
            </Link>
          ) : (
            <>
              <Link to="/eva/login" className="off">
                Iniciar Sesión
              </Link>
              <Link to="/eva/registro" className="on">
                Registrar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderInicio;
