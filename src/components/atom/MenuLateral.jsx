import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/images/eva.png";
import WSPLink from "./WSPLink";

const MenuLateral = ({ link = 0 }) => {
  let history = useHistory();

  const signOut = () => {
    sessionStorage.removeItem(btoa("user"));
    history.push("/login");
  };

  return (
    <>
      <header className="menuLateral">
        <Link to="/" className="link">
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
        <button className="link b-link" onClick={signOut}>
          <i className="fas fa-power-off"></i>
        </button>
      </header>
      <WSPLink />
    </>
  );
};

export default MenuLateral;
