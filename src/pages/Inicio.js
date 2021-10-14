import React from "react";
import { Carousel } from "../components/organism/Carousel";
import { Faq } from "../components/organism/Faq";
import Header from "../layout/Header";

const Inicio = () => {
  return (
    <div>
      <Header />
      <Carousel />
      
      <Faq />
    </div>
  );
};

export default Inicio;
