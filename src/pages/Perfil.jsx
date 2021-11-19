import React from "react";
import MenuLateral from "../components/atom/MenuLateral";

const Perfil = () => {
  return (
    <div className="dashboard">
      <div className="container">
        <MenuLateral link={1} />
        <div className="content"></div>
      </div>
    </div>
  );
};

export default Perfil;
