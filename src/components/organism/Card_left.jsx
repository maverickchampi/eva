import styles from "../../assets/scss/components/_Card.scss";
import photo from "../../assets/images/cardL.png";

export function Card_left() {
  return (
    <div id="objetivos">
      <div className="wrapper_">
        <img src={photo} alt="" />

        <div className="col_">
          <div className="left_">
            <p className="desc_">
              EVA (Emotional Virtual Assistant) es un proyecto creado con la
              finalidad de poder brindarle al usuario una mejor evaluación con
              registro de las emociones y estados de ánimo, y posibles
              respuestas a los problemas emocionales que pueda estar teniendo,
              además, de compartir con otras personas que estén pasando por la
              misma situación.
            </p>
          </div>

          <div className="right_">
            <p className="desc_">
              Las emociones, son importantes en el día a día de una persona, ya
              que nos permiten orientar nuestras acciones de una manera eficaz,
              además nos entregan conocimientos respecto a nuestro entorno y de
              nosotros mismos, permitiendo la toma de decisiones ante diferentes
              situaciones que estemos pasando en cualquier momento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
