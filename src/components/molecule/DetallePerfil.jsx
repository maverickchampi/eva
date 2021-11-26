import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { PRUEBAS } from "../../constants/global";
import { postAnimo } from "../../services/Animo";

const DetallePerfil = ({ user, setUser, cargarAnimos, fechaHoy }) => {
  const [animo, setAnimo] = useState({
    id: fechaHoy.id,
    valor: fechaHoy.valor,
    usuario: fechaHoy.usuario,
    texto: fechaHoy.texto,
    fecha: fechaHoy.fecha,
  });

  useEffect(() => {
    setAnimo({ ...fechaHoy });
  }, [fechaHoy]);

  const cambiaValor = (valor) => {
    setAnimo({
      ...animo,
      valor: valor,
    });
  };

  const guardaAnimo = () => {
    const js = {
      animo: {
        valor: animo.valor,
        usuario: { id: user.id },
        texto: animo.texto,
      },
      login: {
        correo: user.correo,
        contrasenia: user.contrasenia,
      },
    };
    if (animo.id !== null && animo.fecha !== null) {
      js.animo.id = animo.id;
      js.animo.fecha = animo.fecha;
    }

    postAnimo(JSON.stringify(js))
      .then((res) => {
        swal("Estado de ánimo guardado", "", "success");
        cargarAnimos();
      })
      .catch((err) => {
        swal("Error", "Error al guardar estado de ánimo", "error");
      });
  };

  return (
    <div className="detalle-perfil">
      <div className="pregunta">
        {/* <h3>Pregunta del día</h3> */}
        <div className="pregunta-content">
          <h5>¿Como te sientes hoy?</h5>
          <ul className="animo-content">
            <li
              className={animo.valor === 3 ? "on" : ""}
              onClick={() => cambiaValor(3)}
            >
              Bien
            </li>
            <li
              className={animo.valor === 2 ? "on" : ""}
              onClick={() => cambiaValor(2)}
            >
              Regular
            </li>
            <li
              className={animo.valor === 1 ? "on" : ""}
              onClick={() => cambiaValor(1)}
            >
              Mal
            </li>
            <li
              className={animo.valor === 0 ? "on" : ""}
              onClick={() => cambiaValor(0)}
            >
              No lo sé
            </li>
          </ul>
          <textarea
            defaultValue={animo.texto}
            onChange={(e) => setAnimo({ ...animo, texto: e.target.value })}
          ></textarea>
          <div className="botones">
            <button onClick={() => guardaAnimo()}>Guardar</button>
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
