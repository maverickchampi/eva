import React from "react";
import logoEva from "./../assets/images/eva_logo.png";

const Header = () => {
  return (
    <header>
      <div className="menu">
        <img src={logoEva} alt=""></img>        
        <nav>
          <ul>
            <li><a href="#">¿QUE ES EVA?</a></li>
            <li><a href="#">OBJETIVOS</a></li>
            <li><a href="#">FAQ</a></li>            
            <li><button className="btnn">INICIAR SESIÓN</button></li>
            <li><button className="btn-outline">REGÍSTRESE</button></li>
          </ul>
        </nav>        
      </div>
    </header>
  );
};

export default Header;
