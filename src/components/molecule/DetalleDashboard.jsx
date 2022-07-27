import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from '@fullcalendar/core/locales/es';
import swal from "sweetalert";
import { postRecompensa } from "../../services/Recompensa";
import { user } from "../../constants/methods";

const DetalleDashboard = ({ emociones }) => {
  const [events, setEvents] = useState([
    // { id: 1, start: "2021-11-18", title: "😀" },
    // { id: 2, start: "2021-11-17", title: "😡" },
    // { id: 3, start: "2021-11-16", title: "😢" },
    // { id: 4, start: "2021-11-15", title: "" },
    // { id: 5, start: "2021-11-14", title: "" },
  ]);

  const [recomendaciones, setRecomendaciones] = useState([]);

  const numerosAleatorios = (max) => {
    var cantidadNumeros = max;
    var myArray = [];
    while (myArray.length < 3) {
      var numeroAleatorio = Math.ceil(Math.random() * cantidadNumeros);
      var existe = false;
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i] == numeroAleatorio) {
          existe = true;
          break;
        }
      }
      if (!existe) {
        myArray[myArray.length] = numeroAleatorio;
      }
    }

    return myArray;
  };

  const verificarRecomendaciones = (emociones) => {
    // let cantidad = 0;
    // let suma = 0;
    // if (emociones[4] > 0) {
    //   cantidad++;
    //   suma += emociones[4];
    // }

    // if (emociones[5] > 0) {
    //   cantidad++;
    //   suma += emociones[5];
    // }

    // if (cantidad > 0) {
    //   let estadoAnimo = suma / cantidad;

    //   if (estadoAnimo === 3 || estadoAnimo === 2) {
    //     let positions = numerosAleatorios(PRUEBAS.length - 1);
    //     let recomendaciones = [];
    //     recomendaciones.push(PRUEBAS[positions[0]]);
    //     recomendaciones.push(PRUEBAS[positions[1]]);
    //     recomendaciones.push(PRUEBAS[positions[2]]);
    //     setRecomendaciones([...recomendaciones]);
    //   } else if (estadoAnimo === 1) {
    //     let positions = numerosAleatorios(PRUEBAS_SAD.length - 1);
    //     let recomendaciones = [];
    //     recomendaciones.push(PRUEBAS_SAD[positions[0]]);
    //     recomendaciones.push(PRUEBAS_SAD[positions[1]]);
    //     recomendaciones.push(PRUEBAS_SAD[positions[2]]);
    //     setRecomendaciones([...recomendaciones]);
    //   }
    // } else {
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
        {
          imagen: "https://i.ibb.co/qCnxCvG/motivation3.png",
          descripcion: "Es hora de empezar",
        },
        {
          imagen: "https://i.ibb.co/qCnxCvG/motivation3.png",
          descripcion: "Es hora de empezar",
        },
      ]);
    // }
  };

  useEffect(() => {
    verificarRecomendaciones(emociones);
  }, [emociones]);

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
          {recomendaciones.map((item, index) => {
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
          })}
        </div>
      </div>
    </div>
  );
};

export default DetalleDashboard;
