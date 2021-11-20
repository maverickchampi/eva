import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const DetalleDashboard = () => {
  const [events, setEvents] = useState([
    { id: 1, start: "2021-11-18", title: "😀" },
    { id: 2, start: "2021-11-17", title: "😡" },
    { id: 3, start: "2021-11-16", title: "😢" },
    { id: 4, start: "2021-11-15", title: "😲" },
    { id: 5, start: "2021-11-14", title: "🥰" },
  ]);

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
        <div className="recompensa">
          <h3>Come rico en Rappi</h3>
          <p>
            Completa el regisro de tus emociones por 7 días y gana un cupón del
            25%.
          </p>
          <button>Reclamar 0/7</button>
        </div>
      </div>
    </div>
  );
};

export default DetalleDashboard;
