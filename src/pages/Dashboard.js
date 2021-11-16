import React, { useState } from "react";
import HeaderDashboard from "../layout/HeaderDashboard";
import emojiResumen from "./../assets/icons/emoji-resumen.png";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Chat } from "../components/atom/Chat";

const Dashboard = () => {
  const [user, setUser] = useState(
    JSON.parse(atob(sessionStorage.getItem(btoa("user")))) || {}
  );

  return (
    <div className="dashboard">
      <HeaderDashboard usuario={`${user?.nombre} ${user?.apaterno}`} />
      <div className="dashboard-contenedor">
        <div className="dashboard__item">
          <div className=" card card-resumen">
            <div>
              <div>
                <img src={emojiResumen} />
              </div>
              <div>
                <p>En los ultimos dias John ha estado muy feliz ¡Sigue asi!</p>
              </div>
            </div>
            <div>mas contexto</div>
          </div>
          <div className=" card card-estadistica">
            <div className="titulo">
              <i class="fas fa-chart-bar"></i>
              <h5>Estadística</h5>
            </div>
          </div>
          <div className=" card card-emocion">
            <div className="titulo">
              <i class="fas fa-question-circle"></i>
              <h5>¿Cómo te sientes hoy?</h5>
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
          <div className=" card card-calendario"></div>
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
