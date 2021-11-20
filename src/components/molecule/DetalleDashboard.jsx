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
          initialDate="2021-11-30"
          initialView="dayGridMonth"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
        />
      </div>
      <div className="recomendaciones">
        <div>recomendaciones</div>
      </div>
    </div>
  );
};

export default DetalleDashboard;
