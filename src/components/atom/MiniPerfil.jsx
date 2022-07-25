import React from "react";
import { useHistory } from "react-router-dom";
import { Chart } from "primereact/chart";
import swal from "sweetalert";
import { putData } from "../../services/Usuario";

const MiniPerfil = ({ user, buttonsEdit = false, setEdit, emociones }) => {
  let history = useHistory();
  const data = {
    labels: [
      "Julio",
      "Agosto",
      "Setiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Ánimo",
        data: emociones,
        fill: true,
        borderColor: "#7054e8",
        tension: 0.4,
        backgroundColor: "rgba(189,174,255,0.5)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
    },
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
          ) : (
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
      <section className="datos">
        <div className="content-grafico">
          <h2>Estado de emociones en el último mes</h2>
          <div className="grafico">
            <Chart type="line" data={data} options={options} />
          </div>
        </div>
        <div className="leyenda">
          <label className="label">
            <span>3</span> - Bien
          </label>
          <label>
            <span>2</span> - Regular
          </label>
          <label className="label">
            <span>1</span> - Mal
          </label>
          <label>
            <span>0</span> - Desconocido
          </label>
        </div>
      </section>
    </div>
  );
};

export default MiniPerfil;
