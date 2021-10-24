import React from "react";
import { Link } from "react-router-dom";
import logoEva from "./../assets/images/eva_logo.png";
import { user } from "../constants/metodos";

const Header = () => {
  return (
    <header>
      <div className="menu">
        <img src={logoEva} alt=""></img>
        <nav>
          <ul>
            <li>
              <a href="#nosotros">NOSOTROS</a>
            </li>
            <li>
              <a href="#objetivos">OBJETIVOS</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            {user() ? (
              <>
                <li>
                  <button className="btnn">
                    <Link to="/dashboard">Mi dashboard</Link>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button className="btnn">
                    <Link to="/login">INICIAR SESIÓN</Link>
                  </button>
                </li>
                <li>
                  <button className="btn-outline">
                    <Link to="/registro">REGÍSTRESE</Link>
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
