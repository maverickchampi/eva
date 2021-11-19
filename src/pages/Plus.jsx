import React from "react";
import MenuLateral from "../components/atom/MenuLateral";

const Plus = () => {
  return (
    <div className="dashboard">
      <div className="container">
        <MenuLateral link={2} />
        <div className="content"></div>
      </div>
    </div>
  );
};

export default Plus;
