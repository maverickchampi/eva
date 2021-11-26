import React from "react";
import { PRUEBAS } from "../../constants/global";

const DetallePerfil = () => {
  return (
    <div className="detalle-perfil">
      <div className="pregunta">
        {/* <h3>Pregunta del día</h3> */}
        <div className="pregunta-content">
          <h5>¿Como te sientes hoy?</h5>
          <ul className="animo-content">
            <li className="on">Bien</li>
            <li>Regular</li>
            <li>Mal</li>
            <li>No lo sé</li>
          </ul>
          <textarea></textarea>
          <div className="botones">
            <button>Guardar</button>
          </div>
        </div>
      </div>
      <div className="recomendaciones">
        <h3>Recomendaciones</h3>
        <div className="recomendacion-content">
          {PRUEBAS.map((item, index) => {
            return (
              <div className="recomendacion__item" key={index}>
                <span>{index + 1}</span>
                <img src={item.imagen} alt={item.titulo} />
                <div className="recomendacion-descripcion">
                  <h5>{item.titulo}</h5>
                  <p>{item.descripcion}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetallePerfil;
