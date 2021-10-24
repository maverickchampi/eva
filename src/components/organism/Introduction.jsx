import icon from "../../assets/images/company_icon.png";
import img from "../../assets/images/introduction_photo.png";
import styles from "../../assets/scss/components/_introduction.scss";

export function Introduction() {
  return (
    <div id="nosotros">
      <div className="intro">
        <div className="left">
          <img src={icon} alt="company_Eva" />
          <p>¿QUIENES SOMOS?</p>
          <h1 className="description">
            Somos un grupo de chicos que busca crear una herramienta capaz de
            ayudar a las demás personas que buscan aumentar su inteligencia
            emocional. Nuestro bot es nuestro granito de arena en la sociedad,
            ya que para seguir creciendo la salud mental es un factor
            fundamental.
          </h1>
        </div>
        <div className="right">
          <img src={img} alt="teamwork_eva" />
        </div>
      </div>
    </div>
  );
}
