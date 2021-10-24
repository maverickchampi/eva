import photo from "../../assets/images/cardR.png";

export function Card_right() {
  return (
    <div>
      <div className="wrapper_">
        <div className="col_">
          <div className="left_">
            <p className="desc_">
              Con EVA no queremos ocupar el lugar de un psicólogo, si no, lo que
              queremos es que la persona que lo use se sienta cómoda y pueda
              decidir que hacer dentro de la plataforma y que compartir. Dar
              soporte mediante un chat, brindar datos de sus registros de
              emociones y ser parte de una comunidad con el mismo objetivo.
            </p>
          </div>

          <div className="right_">
            <p className="desc_">
              Nuestra iniciativa por crear un asistente emocional busca atender
              los problemas emocionales de una persona, por medio de una
              plataforma en la que pueda confiar y expresar sobre cómo se
              siente, sin tener que estar obligados a hablar permitiendo tener
              una ayuda emocional mediante nuestro Bot y las demás herramientas.
            </p>
          </div>
        </div>

        <img src={photo} alt="" className="o-top" />
      </div>
    </div>
  );
}
