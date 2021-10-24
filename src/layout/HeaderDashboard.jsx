import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import logoEva from "./../assets/images/eva_logo.png";
import NavDropdown from "react-bootstrap/NavDropdown";

const HeaderDashboard = ({ usuario }) => {
  let history = useHistory();

  const signOut = () => {
    sessionStorage.removeItem(btoa("user"));
    history.push("/login");
  };

  return (
    <div className="headerDashboard-contenedor">
      <div className="headerDashboard">
        <div className="logo">
          <Link to="/">
            <img src={logoEva} alt="" />
          </Link>
        </div>
        <div className="informacion">
          <NavDropdown title={usuario || ""} id="navbarScrollingDropdown">
            <NavDropdown.Item href="">
              <Link to="/dashboard">Dashboard</Link>
            </NavDropdown.Item>
            <NavDropdown.Item href="">
              <Link to="/perfil">Perfil</Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={signOut}>Cerrar sesión</NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
    </div>
  );
};
export default HeaderDashboard;
