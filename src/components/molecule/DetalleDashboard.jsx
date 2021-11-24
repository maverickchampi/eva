import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import swal from "sweetalert";
import { postRecompensa } from "../../services/Recompensa";
import { user } from "../../constants/methods";

const DetalleDashboard = ({ recompensas, emociones }) => {
  const [recompensa, setRecompensa] = useState(recompensas[0]);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([
    // { id: 1, start: "2021-11-18", title: "😀" },
    // { id: 2, start: "2021-11-17", title: "😡" },
    // { id: 3, start: "2021-11-16", title: "😢" },
    // { id: 4, start: "2021-11-15", title: "" },
    // { id: 5, start: "2021-11-14", title: "" },
  ]);

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
    postRecompensa(JSON.stringify(json)).then((resp) => {
      setLoading(false);
      swal("Felicidades!", "El cupón ya fue enviado a tu correo", "success");
    });
  };

  const completarCupon = (id) => {
    // console.log(id);
    swal(
      "Opps!",
      "Aún debes completar la tarea para reclamar el cupón",
      "error"
    );
  };

  useEffect(() => {
    const returnEmoji = (valor) => {
      switch (valor) {
        case 1:
          return "😡";
        case 2:
          return "😢";
        case 3:
          return "😲";
        case 4:
          return "😀";
        case 5:
          return "🥰";
      }
    };

    let __emociones = [];
    emociones.map((emocion) => {
      let newEvent = {
        id: emocion.id,
        start: emocion.fecha,
        title: returnEmoji(emocion.valor),
      };
      __emociones.push(newEvent);
    });
    setEvents([...__emociones]);
  }, [emociones]);

  return (
    <div className="detalle-dashboard">
      <div className="calendario">
        {/* <h4>Calendario de emociones</h4> */}
        <FullCalendar
          events={events}
          initialView="dayGridMonth"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
        />
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

export default DetalleDashboard;
