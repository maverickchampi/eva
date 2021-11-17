import React, { useEffect, useState } from "react";
import HeaderDashboard from "../layout/HeaderDashboard";
import emojiResumen from "./../assets/icons/emoji-resumen.png";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Chat } from "../components/atom/Chat";
import { ESTADOS_ANIMOS } from "./../data/global";
import { Line } from "react-chartjs-2";
import Calendario from "../components/molecule/Calendario";
import swal from "sweetalert";
import { putData } from "../services/login";

const Dashboard = () => {
  const [video, setVideo] = useState(
    "https://cdnl.iconscout.com/lottie/premium/preview-watermark/drooling-cat-3978275-3291095.mp4"
  );
  const [animo, setAnimo] = useState([0, 0, 0, 0, 0, 0]);
  const [fechaHoy, setFechaHoy] = useState({ animo: { animo: 0 } });

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

  const elegirEmocion = (e) => {
    let estado = document.getElementsByClassName("card-estado");
    for (let i = 0; i < estado.length; i++) {
      estado[i].classList.remove("on");
    }

    e.target.classList.add("on");
  };

  useEffect(() => {
    console.log(user);
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
          if (
            new Date(element.fecha).toLocaleDateString() ==
            new Date().toLocaleDateString()
          ) {
            setFechaHoy({
              ...fechaHoy,
              animo: { fecha: element.fecha, animo: element.animo },
            });
          }

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

      // console.log(cantidad);

      setAnimo([
        cantidad[0].cantidad > 0
          ? Number((cantidad[0].valor / cantidad[0].cantidad).toFixed(0))
          : 0,
        cantidad[1].cantidad > 0
          ? Number((cantidad[1].valor / cantidad[1].cantidad).toFixed(0))
          : 0,
        cantidad[2].cantidad > 0
          ? Number((cantidad[2].valor / cantidad[2].cantidad).toFixed(0))
          : 0,
        cantidad[3].cantidad > 0
          ? Number((cantidad[3].valor / cantidad[3].cantidad).toFixed(0))
          : 0,
        cantidad[4].cantidad > 0
          ? Number((cantidad[4].valor / cantidad[4].cantidad).toFixed(0))
          : 0,
        cantidad[5].cantidad > 0
          ? Number((cantidad[5].valor / cantidad[5].cantidad).toFixed(0))
          : null,
      ]);

      if (cantidad[4].cantidad > 0) {
        if (
          Number((cantidad[4].valor / cantidad[4].cantidad).toFixed(0)) === 1
        ) {
          setVideo(
            "https://cdnl.iconscout.com/lottie/premium/preview-watermark/sad-cat-3978265-3291085.mp4"
          );
        } else {
          setVideo(
            "https://cdnl.iconscout.com/lottie/premium/preview-watermark/drooling-cat-3978275-3291095.mp4"
          );
        }
      }

      setTimeout(() => {
        console.log(animo);
      }, 0);
    }
  }, [user]);

  const mensaje = () => {
    let name = user.nombre;
    switch (animo[4]) {
      case 3:
        return `Hola ${name}, estos últimos días has estado genial, todo en base a tu esfuerzo, felicidades `;

      case 2:
        return `Hola ${name}, estos últimos días has estado emocionalmente regular, sigue así ánimos`;

      case 1:
        return `Hola ${name}, estos últimos días has estado fatal, porfavor te recomiendo seguir los consejos o hablar con EVA `;

      default:
        return `Hola ${name}, es hora de completar tus registros, cuéntame ¿como vas hoy?`;
    }
  };
  // console.log(fechaHoy);
  const actualizaEstado = (value) => {
    const _user = user;

    const position = _user.calendarioAnimo.findIndex(
      (e) =>
        new Date(e.fecha).toLocaleDateString() ==
        new Date().toLocaleDateString()
    );

    if (position === -1) {
      _user.calendarioAnimo.push({
        fecha: new Date(),
        animo: Number(value),
      });
    } else {
      _user.calendarioAnimo[position].animo = Number(value);
    }

    setUser({});
    setUser({ ..._user });

    setTimeout(() => {
      sessionStorage.setItem(btoa("user"), btoa(JSON.stringify({ ..._user })));
    }, 0);

    putData(JSON.stringify(_user))
      .then((response) => {
        console.log(response);
      })
      .catch((error) =>
        swal("Opps!", "Error al actualizar, intentelo nuevamente", "error")
      );
  };

  return (
    <div className="dashboard">
      <HeaderDashboard usuario={`${user?.nombre} ${user?.apaterno}`} />
      <div className="dashboard-contenedor">
        <div className="dashboard__item">
          <div className=" card card-resumen">
            <div className="content-box">
              <div>
                <img
                  src={user?.foto}
                  alt={user?.nombre}
                  style={{ width: "90px", borderRadius: "50%" }}
                />
                <video
                  className="video"
                  src={video}
                  autoPlay="autoplay"
                  muted="muted"
                  loop="loop"
                  playsInline=""
                  type="video/mp4"
                ></video>
              </div>
              <div>
                <p>{mensaje()}</p>
              </div>
            </div>
            <div className="content-box-2">
              <p>¿Cómo estás hoy?</p>
              <select onChange={(e) => actualizaEstado(e.target.value)}>
                <option
                  value="0"
                  selected={fechaHoy?.animo?.animo == 0 ? true : false}
                >
                  Seleccione
                </option>
                <option
                  value="3"
                  selected={fechaHoy?.animo?.animo == 3 ? true : false}
                >
                  Bien
                </option>
                <option
                  value="2"
                  selected={fechaHoy?.animo?.animo == 2 ? true : false}
                >
                  Normal
                </option>
                <option
                  value="1"
                  selected={fechaHoy?.animo?.animo == 1 ? true : false}
                >
                  Mal
                </option>
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
                    <li
                      key={key}
                      className="card-estado"
                      onClick={(e) => elegirEmocion(e)}
                    >
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
