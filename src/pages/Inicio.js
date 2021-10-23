import React from "react";
import { Card_left } from "../components/organism/Card_left";
import { Card_right } from "../components/organism/Card_right";
import { Carousel } from "../components/organism/Carousel";
import { Faq } from "../components/organism/Faq";
import { Introduction } from "../components/organism/Introduction";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

const Inicio = () => {
  return (
    <div>
      <Header />
      <Carousel />      
      <Introduction />
      <Card_left />
      <Card_right />
      <Faq />
      <Footer />
    </div>
  );
};

export default Inicio;
