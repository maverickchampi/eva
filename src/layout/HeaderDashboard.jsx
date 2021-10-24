import React from "react";
import { Link } from "react-router-dom";
import logoEva from "./../assets/images/eva_logo.png";
import NavDropdown from "react-bootstrap/NavDropdown";

const HeaderDashboard = ({ usuario }) => {
  return (
    <header className="headerDashboard-contenedor">
      <div className="headerDashboard">
        <div className="logo">
          <Link to="/">
            <img src={logoEva} alt="" />
          </Link>
        </div>
        <div className="informacion">
          <NavDropdown
            title={usuario || ""}
            id="navbarScrollingDropdown"
            className="nav"
          >
            <NavDropdown.Item href="">
              <Link to="/dashboard">Dashboard</Link>
            </NavDropdown.Item>
            <NavDropdown.Item href="">
              <Link to="/perfil">Perfil</Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">Cerrar sesión</NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
    </header>
  );
};
export default HeaderDashboard;
