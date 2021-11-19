import React from "react";
import MenuLateral from "../components/atom/MenuLateral";

const Baul = () => {
  return (
    <div className="dashboard">
      <div className="container">
        <MenuLateral link={3} />
        <div className="content"></div>
      </div>
    </div>
  );
};

export default Baul;
