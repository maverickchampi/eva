import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import swal from "sweetalert";

const DetalleDashboard = ({ recompensas }) => {
  const [recompensa, setRecompensa] = useState(recompensas[0]);
  const [events, setEvents] = useState([
    { id: 1, start: "2021-11-18", title: "😀" },
    { id: 2, start: "2021-11-17", title: "😡" },
    { id: 3, start: "2021-11-16", title: "😢" },
    { id: 4, start: "2021-11-15", title: "😲" },
    { id: 5, start: "2021-11-14", title: "🥰" },
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

  const reclamarCupon = () => {
    swal("Felicidades!", "El cupón ya fue enviado a tu correo", "success");
  };

  const completarCupon = () => {
    swal(
      "Opps!",
      "Aún debes completar la tarea para reclamar el cupón",
      "error"
    );
  };

  useEffect(() => {}, []);

  return (
    <div class="detalle-dashboard">
      <div className="calendario">
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
            <button
              onClick={() =>
                recompensa.status ? reclamarCupon() : completarCupon()
              }
            >
              {recompensa.status
                ? `Completar ${recompensa.descriptionStatus}`
                : `Reclamar ${recompensa.descriptionStatus}`}
            </button>
            <div>
              <button onClick={() => backRecompensa()}>
                <i class="fas fa-chevron-left"></i>
              </button>
              <button onClick={() => nextRecompensa()}>
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleDashboard;
