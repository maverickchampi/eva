import React from "react";
import { Carousel } from "../components/organism/Carousel";
import { Faq } from "../components/organism/Faq";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

const Inicio = () => {
  return (
    <div>
      <Header />
      <Carousel />
      
      <Faq />
      <Footer />
    </div>
  );
};

export default Inicio;
