import React, { useEffect, useState } from "react";
import HeaderDashboard from "../layout/HeaderDashboard";
import emojiResumen from "./../assets/icons/emoji-resumen.png";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Chat } from "../components/atom/Chat";
import { ESTADOS_ANIMOS } from "./../data/global";
import { Line } from "react-chartjs-2";
import Calendario from "../components/molecule/Calendario";

const Dashboard = () => {
  const [animo, setAnimo] = useState([0, 0, 0, 0, 0, 0]);

  const data = {
    labels: [
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "promedio estado ánimo",
        data: animo,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const [user, setUser] = useState(
    JSON.parse(atob(sessionStorage.getItem(btoa("user")))) || {}
  );
  useEffect(() => {
    let estado = document.querySelectorAll(".card-estado");
    estado[0].classList.add("on");
  }, []);

  useEffect(() => {
    let cantidad = [
      { valor: 0, cantidad: 0 },
      { valor: 0, cantidad: 0 },
      { valor: 0, cantidad: 0 },
      { valor: 0, cantidad: 0 },
      { valor: 0, cantidad: 0 },
      { valor: 0, cantidad: 0 },
    ];

    if (user.calendarioAnimo.length > 0) {
      user.calendarioAnimo.forEach((element) => {
        if (element.animo !== 0) {
          switch (new Date(element.fecha).getMonth()) {
            case 6:
              cantidad[0].valor += element.animo;
              cantidad[0].cantidad += 1;
              break;
            case 7:
              cantidad[1].valor += element.animo;
              cantidad[1].cantidad += 1;
              break;
            case 8:
              cantidad[2].valor += element.animo;
              cantidad[2].cantidad += 1;
              break;
            case 9:
              cantidad[3].valor += element.animo;
              cantidad[3].cantidad += 1;
              break;
            case 10:
              cantidad[4].valor += element.animo;
              cantidad[4].cantidad += 1;
              break;
            case 11:
              cantidad[5].valor += element.animo;
              cantidad[5].cantidad += 1;
              break;
          }
        }
      });

      console.log(cantidad);

      setAnimo([
        cantidad[0].cantidad > 0
          ? (cantidad[0].valor / cantidad[0].cantidad).toFixed(0)
          : 0,
        cantidad[1].cantidad > 0
          ? (cantidad[1].valor / cantidad[1].cantidad).toFixed(0)
          : 0,
        cantidad[2].cantidad > 0
          ? (cantidad[2].valor / cantidad[2].cantidad).toFixed(0)
          : 0,
        cantidad[3].cantidad > 0
          ? (cantidad[3].valor / cantidad[3].cantidad).toFixed(0)
          : 0,
        cantidad[4].cantidad > 0
          ? (cantidad[4].valor / cantidad[4].cantidad).toFixed(0)
          : 0,
        cantidad[5].cantidad > 0
          ? (cantidad[5].valor / cantidad[5].cantidad).toFixed(0)
          : null,
      ]);

      setTimeout(() => {
        console.log(animo);
      }, 0);
    }
  }, []);

  return (
    <div className="dashboard">
      <HeaderDashboard usuario={`${user?.nombre} ${user?.apaterno}`} />
      <div className="dashboard-contenedor">
        <div className="dashboard__item">
          <div className=" card card-resumen">
            <div className="content-box">
              <div>
                <img src={emojiResumen} />
              </div>
              <div>
                <p>En los ultimos dias John ha estado muy feliz ¡Sigue asi!</p>
              </div>
            </div>
            <div className="content-box-2">
              <p>¿Cómo estás hoy?</p>
              <select>
                <option value="0">Seleccione</option>
                <option value="3">Bien</option>
                <option value="2">Normal</option>
                <option value="1">Mal</option>
              </select>
            </div>
          </div>
          <div className=" card card-estadistica">
            <div className="titulo">
              <i className="fas fa-chart-bar"></i>
              <h5>Estadística</h5>
            </div>
            <div className="card-content graf">
              <div style={{ width: "80%", margin: "auto" }}>
                <Line data={data} options={options} />
              </div>
            </div>
          </div>
          <div className="card card-emocion">
            <div className="titulo">
              <i class="fas fa-question-circle"></i>
              <h5>¿Cómo te sientes hoy?</h5>
            </div>
            <div className="card-content">
              <ul>
                {ESTADOS_ANIMOS.map((item, key) => {
                  return (
                    <li key={key} className="card-estado">
                      <img src={item.src} alt={item.name} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="dashboard__item">
          <div className=" card card-publicacion">
            <div className="publicacion-nueva">
              <h5>Nueva publicacion</h5>
              <form>
                <textarea></textarea>
                <button>Publicar</button>
              </form>
            </div>
            <div>
              <Tabs
                defaultActiveKey="todo"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="todo" title="Todos">
                  <p>todas la publicaciones</p>
                </Tab>
                <Tab eventKey="mio" title="Solo mio">
                  <p>mis publicaciones</p>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="dashboard__item">
          <div className=" card card-calendario">
            <Calendario />
          </div>
          <div className=" card card-recomendacion">
            <div className="titulo">
              <i class="fas fa-paste"></i>
              <h5>Recomendaciones</h5>
            </div>
          </div>
        </div>
      </div>
      <Chat />
    </div>
  );
};
export default Dashboard;
