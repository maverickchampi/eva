import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Chart } from "primereact/chart";
import swal from "sweetalert";
import { putData } from "../../services/Usuario";

const MiniPerfil = ({ user, buttonsEdit = false, isReserva = false, setEdit, emociones }) => {
  let history = useHistory();
  const [citas, setCitas] = useState([]);
  const data = {
    labels: [
      "Alegria",
      "Tristeza",
      "Miedo",
      "Ira",
      "Desagrado"
    ],
    datasets: [
      {
        data: [10, 20, 30, 10, 0],
        backgroundColor: [
          "#f9ef31",
          "#427df5",
          "#666666",
          "#f33576",
          "#4cd7a7",
        ],
        hoverBackgroundColor: [
          "#f9ef31",
          "#427df5",
          "#666666",
          "#f33576",
          "#4cd7a7",
        ]
      }
  ]
  };
  const dataCitas= [
    {
      id: '1',

    }
  ]

  // change position legend
  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
            color: '#495057'
        }
      }
    }
  };

  const fechaHoy = new Date();

  const editarPerfil = () => {
    setEdit(false);
  };

  const eliminarPerfil = () => {
    swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminado tu perfil no podrás recuperarlo",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal({
          title: "Por seguridad debemos volverte a preguntar",
          text: "Una vez clickeado 'Ok' la acción será irreversible",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            user.estado = false;
            putData(JSON.stringify(user))
              .then((res) => {
                sessionStorage.removeItem(btoa("user"));
                history.push("/eva/login");
                swal("Tu perfil ha sido eliminado", {
                  icon: "success",
                });
              })
              .catch((err) => {
                swal("Error", "Error al eliminar", "error");
              });
          } else {
            swal("", "Tu perfil no ha sido eliminado", "info");
          }
        });
      } else {
        swal("", "Tu perfil no ha sido eliminado", "info");
      }
    });
  };

  // useEffect(() => {
  //   setCitas(data)
  // }, []);

  return (
    <div className="miniperfil">
      <section className="informacion">
        <div className="content__title">
          <div className="content__img">
            <img src={user.foto} alt="Foto de perfil" />
          </div>
          <div>
            <h1>{`${user.nombre} ${user.apellidoPa}`}</h1>
            <label>
              <i className="fas fa-map-marker-alt"></i> Lima, Perú
            </label>
          </div>
        </div>
        <div className="content__subtitle">
          {buttonsEdit ? (
            <>
              <div className="perfil-button">
                <button className="edit" onClick={() => editarPerfil()}>
                  <i className="fas fa-pen"></i>
                </button>
                <label className="sub">Editar</label>
              </div>
              <div className="perfil-button">
                <button className="delete" onClick={() => eliminarPerfil()}>
                  <i className="fas fa-minus-circle"></i>
                </button>
                <label className="sub">Eliminar</label>
              </div>
            </>
          ) : isReserva ? 
          (
            <>
              <div>
                <label className="top">{user.posts || 0}</label>
                <label className="sub">Citas registradas</label>
              </div>
              <div>
                <label className="top">{user.likes || 0}</label>
                <label className="sub">Costo promedio</label>
              </div>
            </>
          )
          :(
            <>
              <div>
                <label className="top">{user.posts}</label>
                <label className="sub">posts</label>
              </div>
              <div>
                <label className="top">{user.likes}</label>
                <label className="sub">likes</label>
              </div>
            </>
          )}
          <div>
            <label className="top">{`${fechaHoy.getDate()}/${
              fechaHoy.getMonth() + 1
            }`}</label>
            <label className="sub">{fechaHoy.getFullYear()}</label>
          </div>
        </div>
      </section>
      {
        isReserva? 
        (
          <>
            <section className="datos">
            </section>
          </>
        ):
        (
          <section className="datos">
            <div className="content-grafico">
              <h2>Gráfico de emociones en: 
                <select>
                  <option value="">Último mes</option>
                  <option value="">Últimos 3 meses</option>
                  <option value="">Últimos 6 meses</option>
                  <option value="">Último año</option>
                </select>
              </h2>
              <div className="grafico">
                <Chart type="pie" data={data} options={options} />
              </div>
            </div>
          </section>
        )
      }
    </div>
  );
};

export default MiniPerfil;
