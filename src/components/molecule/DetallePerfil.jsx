import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { PRUEBAS, PRUEBAS_SAD } from "../../constants/global";
import ModalObjetivo from "./ModalObjetivo";
import Objetivo from "./Objetivo";

const DetallePerfil = ({ user, setUser, objetivos, recompensas, openAgregarObjetivo, openEditarObjetivo }) => {
  const [recompensa, setRecompensa] = useState(recompensas[0]);
  const [loading, setLoading] = useState(false);

  const backRecompensa = () => {
    let max = recompensas.length - 1;
    let position = recompensas.indexOf(recompensa);
    let prevValue = position - 1 < 0 ? max : position - 1;
    setRecompensa(recompensas[prevValue]);
  };

  const nextRecompensa = () => {
    let max = recompensas.length - 1;
    let position = recompensas.indexOf(recompensa);
    let newVale = position + 1 > max ? 0 : position + 1;
    setRecompensa(recompensas[newVale]);
  };

  const reclamarCupon = (id) => {
    const json = {
      recompensa: {
        tipo: id,
        usuario: { id: user().id },
      },
      login: {
        correo: user().correo,
        contrasenia: user().contrasenia,
      },
    };
    setLoading(true);
    // console.log(json);
    // postRecompensa(JSON.stringify(json)).then((resp) => {
    //   setLoading(false);
    //   swal("Felicidades!", "El cupón ya fue enviado a tu correo", "success");
    // });
  };

  const completarCupon = (id) => {
    // console.log(id);
    swal(
      "Opps!",
      "Aún debes completar la tarea para reclamar el cupón",
      "error"
    );
  };

  return (
    <div className="detalle-perfil">
      <div className='objetivos'>
        <div className="title">
          <h3>Objetivos</h3>
          <button type="button" className="btn_float" onClick={openAgregarObjetivo}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
        {
          objetivos?.map((objetivo, key) =>{
            return <Objetivo key={key} objetivo={objetivo} handleClick={() => openEditarObjetivo(objetivo)}/>
          })
        }
      </div>
      <div className="recompensas">
        <div className={`recompensa ${recompensa.class}`}>
          <h3>{recompensa.title}</h3>
          <p>{recompensa.description}</p>
          <div className="botones">
            {loading ? (
              <label className="loading-recompensa">Cargando...</label>
            ) : (
              <button
                onClick={() =>
                  recompensa.valor_entregado >= recompensa.valor_total
                    ? reclamarCupon(recompensa.id)
                    : completarCupon(recompensa.id)
                }
              >
                {recompensa.valor_entregado >= recompensa.valor_total
                  ? `Reclamar ${recompensa.valor_entregado} / ${recompensa.valor_total}`
                  : `Completar ${recompensa.valor_entregado} / ${recompensa.valor_total}`}
              </button>
            )}
            <div>
              <button onClick={() => backRecompensa()}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <button onClick={() => nextRecompensa()}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallePerfil;
