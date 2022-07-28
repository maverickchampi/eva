import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from '@fullcalendar/core/locales/es';
import swal from "sweetalert";
import { postRecompensa } from "../../services/Recompensa";
import { user } from "../../constants/methods";
import { RECOMENDACIONES_DATA } from "../../constants/global";

const DetalleDashboard = ({ emociones }) => {
  const [events, setEvents] = useState([]);

  const [recomendaciones, setRecomendaciones] = useState([]);

  const numerosAleatorios = (array) => {
    let array_aleatorios = [], array_copia = [...array];

    for(let i = 0; i < 5; i++) {
      const numeroAleatorio = Math.round(Math.random() * (array_copia.length - 1));
      array_aleatorios.push(array_copia[numeroAleatorio])
      array_copia.splice(numeroAleatorio, 1);
    }

    return array_aleatorios;
  };

  const verificarRecomendaciones = () => {
    const cantidades = emociones?.map((emocion) => (emocion.valor))
    if(cantidades.length === 0) {
      setRecomendaciones([
        {
          imagen: "https://i.ibb.co/thgt5kb/motivated.png",
          descripcion: "Es hora de comenzar a escribir como te sientes",
        },
        {
          imagen: "https://i.ibb.co/DWX2Sgx/motivation2.png",
          descripcion: "A más datos más análisis",
        },
        {
          imagen: "https://i.ibb.co/qCnxCvG/motivation3.png",
          descripcion: "Es hora de empezar",
        },
      ]);
      return 
    }

    const sum_cantidades = cantidades.reduce((previous, current) => current += previous);
    const promedio = sum_cantidades / cantidades.length;

    const recomendaciones_promedio = RECOMENDACIONES_DATA.filter((recomendacion) => recomendacion.id_emocion = Math.floor(promedio))
    const recomendaciones_aleatorio = numerosAleatorios(recomendaciones_promedio);
    setRecomendaciones(recomendaciones_aleatorio)
  };

  useEffect(() => {
    verificarRecomendaciones();
  }, [emociones]);

  useEffect(() => {
    const returnEmoji = (valor) => {
      switch (valor) {
        case 1:
          return "😊";
        case 2:
          return "🥺";
        case 3:
          return "😧";
        case 4:
          return "😡";
        case 5:
          return "😒";
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
        <FullCalendar
          events={events}
          locale={esLocale}
          initialView="dayGridMonth"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
        />
      </div>
      <div className="recomendaciones">
        <h3>Recomendaciones</h3>
        <div className="recomendacion-content">
          {recomendaciones?.length> 0 ? 
            recomendaciones.map((item, index) => {
              return (
                <div className="recomendacion__item" key={index}>
                  <span>{index + 1}</span>
                  <img src={item?.imagen} alt={item?.descripcion} />
                  <div className="recomendacion-descripcion">
                    {/* <h5>{item.titulo}</h5> */}
                    <p>{item?.descripcion}</p>
                  </div>
                </div>
              );
            }) : 
            (
              <div>No se encontro nada</div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default DetalleDashboard;
