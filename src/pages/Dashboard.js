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
        data: [1, 3, 2, 1, 2, 2],
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
            <div>
              <p>Has estado muy bien</p>
              <p>Ánimos tu puedes</p>
              <p>Hay personas que te quieren</p>
            </div>
          </div>
          <div className=" card card-estadistica">
            <div className="titulo">
              <i class="fas fa-chart-bar"></i>
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
