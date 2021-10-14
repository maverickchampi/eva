import imga from "../../assets/images/carousel_card_1.png";
import imgb from "../../assets/images/carousel_card_2.png";
import imgc from "../../assets/images/carousel_card_3.png";

export function Carousel(){
    return (
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={imga} className="d-block w-100" alt="LA PRIMERA INTELIGENCIA ARTIFICIAL ENTRENADA POR PROFESIONALES EN PERÚ" />
    </div>
    <div className="carousel-item">
      <img src={imgb} className="d-block w-100" alt="PORQUE QUEREMOS MEJORAR TU CALIDAD DE VIDA" />
    </div>
    <div className="carousel-item">
      <img src={imgc} className="d-block w-100" alt="Y ESTAR CONTIGO CUANDO NOS NECESITES" />
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
    );
}