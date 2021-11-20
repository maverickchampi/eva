import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/eva.png";
import WSPLink from "./WSPLink";

const MenuLateral = ({ link = 0 }) => {
  return (
    <>
      <header className="menuLateral">
        <Link to="/dashboard" className="link">
          <img src={logo} alt="logo" />
        </Link>
        <nav>
          <Link
            to="/dashboard"
            className={`link ${link === 0 ? "active" : ""}`}
          >
            <i className="fas fa-home"></i>
          </Link>
          <Link to="/perfil" className={`link ${link === 1 ? "active" : ""}`}>
            <i className="fas fa-user"></i>
          </Link>
          <Link to="/plus" className={`link ${link === 2 ? "active" : ""}`}>
            <i className="fas fa-plus"></i>
          </Link>
          <Link to="/box" className={`link ${link === 3 ? "active" : ""}`}>
            <i className="fas fa-box"></i>
          </Link>
        </nav>
        <Link to="" className="link">
          <i className="fas fa-power-off"></i>
        </Link>
      </header>
      <WSPLink />
    </>
  );
};

export default MenuLateral;
