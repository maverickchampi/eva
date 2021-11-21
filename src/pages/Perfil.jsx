import React, { useState, useEffect } from "react";
import MenuLateral from "../components/atom/MenuLateral";

const Perfil = () => {
  return (
    <div className="dashboard">
      <div className="container">
        <MenuLateral link={1} />
        <div className="content" style={{ width: "30%" }}></div>
      </div>
    </div>
  );
};

export default Perfil;
