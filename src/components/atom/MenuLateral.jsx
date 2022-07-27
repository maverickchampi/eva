import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import logo from "../../assets/images/eva.png";
import WSPLink from "./WSPLink";

const MenuLateral = ({ link = 0 }) => {
  let history = useHistory();

  const signOut = () => {
    swal({
      title: "¿Desea cerrar sesión?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        sessionStorage.removeItem(btoa("user"));
        history.push("/eva/login");
      }
    });
  };

  return (
    <>
      <header className="menuLateral">
        <Link to="/eva/" className="link">
          <img src={logo} alt="logo" />
        </Link>
        <nav>
          <Link
            to="/eva/dashboard"
            className={`link ${link === 0 ? "active" : ""}`}
          >
            <i className="fas fa-home"></i>
          </Link>

          <Link
            to="/eva/perfil"
            className={`link ${link === 1 ? "active" : ""}`}
          >
            <i className="fas fa-user"></i>
          </Link>
          <Link to="/eva/plus" className={`link ${link === 2 ? "active" : ""}`}>
            <i className="fas fa-box"></i>
          </Link>
          <Link to="/eva/psicologos" className={`link ${link === 3 ? "active" : ""}`}>
            <i className="fas fa-brain"/>
          </Link>
        </nav>
        <button className="link b-link" onClick={signOut}>
          <i className="fas fa-power-off"></i>
        </button>
      </header>
      <WSPLink />
    </>
  );
};

export default MenuLateral;
