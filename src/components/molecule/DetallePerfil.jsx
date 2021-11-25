import React from "react";

const DetallePerfil = () => {
  return (
    <div className="detalle-perfil">
      <div className="pregunta">
        <h3>Pregunta del día</h3>
        <hr />
      </div>
      <div className="recomendaciones">
        <h3>Recomendaciones</h3>
        <hr />
        <div className="recomendacion-content">
          <div className="recomendacion__item">1</div>
          <div className="recomendacion__item">2</div>
          <div className="recomendacion__item">3</div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default DetallePerfil;
