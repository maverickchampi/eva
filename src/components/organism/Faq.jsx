
export function Faq() {
  return (
    <div className="accordion" id="faq">
      <div>
        <div
          className="contentBx"
          onClick={(e) => e.target.classList.toggle("active")}
        >
          <label className="label">¿Qué significa EVA?</label>
          <div className="content">
            <p>Emotional virtual assistant.</p>
          </div>
        </div>

        <div
          className="contentBx"
          onClick={(e) => e.target.classList.toggle("active")}
        >
          <label className="label">¿Cómo nace EVA?</label>
          <div className="content">
            <p>
              Debido a los problemas emocionales por el que gran número de
              personas pasan y como esto afecta en su estilo de vida, y nosotros
              queriendo cambiar dicha problemática.
            </p>
          </div>
        </div>

        <div
          className="contentBx"
          onClick={(e) => e.target.classList.toggle("active")}
        >
          <label className="label">¿Por qué EVA?</label>
          <div className="content">
            <p>
              Con EVA queremos lograr mostrar el significado en el nombre y con
              estas siglas se logró, un asistente emocional virtual.
            </p>
          </div>
        </div>
        <div
          className="contentBx"
          onClick={(e) => e.target.classList.toggle("active")}
        >
          <label className="label">¿Cuál es el público objetivo?</label>
          <div className="content">
            <p>
              Toda persona que quiera mejorar emocionalmente o necesite alguna
              ayuda emocional
            </p>
          </div>
        </div>

        <div
          className="contentBx"
          onClick={(e) => e.target.classList.toggle("active")}
        >
          <label className="label">¿Cuáles son los objetivos de EVA?</label>
          <div className="content">
            <p>
              Convertirnos en la aplicación web más concurrida por jóvenes y
              adultos para servir de ayuda emocional en menos de 1 año.
              Incentivar sobre el concepto de salud mental.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div
          className="contentBx"
          onClick={(e) => e.target.classList.toggle("active")}
        >
          <label className="label">¿Cuáles son los servicios de EVA?</label>
          <div className="content">
            <ul>
              <li>
                <p>Dar soporte emocional por el chat.</p>
              </li>
              <li>
                <p>Brindar estadística de tus estados de ánimos.</p>
              </li>
              <li>
                <p>Mostrar un calendario de emociones.</p>
              </li>
              <li>
                <p>Recomendarte cosas que puedes potenciar.</p>
              </li>
              <li>
                <p>Ser parte de una comunidad con el mismo objetivo.</p>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="contentBx"
          onClick={(e) => e.target.classList.toggle("active")}
        >
          <label className="label">¿EVA reemplaza a un psicólogo?</label>
          <div className="content">
            <p>
              No, lo que buscamos con EVA es querer complementar y auxiliar, más
              no ser un reemplazo de un psicólogo.
            </p>
          </div>
        </div>

        <div
          className="contentBx"
          onClick={(e) => e.target.classList.toggle("active")}
        >
          <label className="label">¿EVA es gratis? </label>
          <div className="content">
            <p>
              Si, todos los servicios que tenga EVA son completamente gratis,
              solo necesitar registrar y ya podrás interactuar con las
              herramientas que brindamos.
            </p>
          </div>
        </div>

        <div
          className="contentBx"
          onClick={(e) => e.target.classList.toggle("active")}
        >
          <label className="label">¿EVA da tratamientos?</label>
          <div className="content">
            <p>
              No, siempre recomendaremos ir con un psicólogo, EVA solo buscar
              orientar y motivar a personas a mejorar la inteligencia emocional.
            </p>
          </div>
        </div>

        <div
          className="contentBx"
          onClick={(e) => e.target.classList.toggle("active")}
        >
          <label className="label">
            ¿EVA es un Bot que me da respuestas programadas?
          </label>
          <div className="content">
            <p>
              No, pensando en ello decidimos usar machine learning que lo que
              hace es hacer que el Bot se adapte a partir de la información
              brindada por los usuarios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
