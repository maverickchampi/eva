import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Chart } from "primereact/chart";
import swal from "sweetalert";
import { putData } from "../../services/Usuario";
import { subtraerDias } from "../../constants/methods";
import { info } from "sass";

const MiniPerfil = ({ 
  user, 
  buttonsEdit = false, 
  isReserva = false, 
  setEdit, 
  emociones,
}) => {
  let history = useHistory()
  //Filtro estadistico gráfico
  const [estadistica, setEstadistica] = useState([0, 0, 0, 0, 0])
  const [filtroEstadistica, setFiltroEstadistica] = useState(30)
  const data = {
    labels: [
      "😊Alegria",
      "🥺Tristeza",
      "😧Miedo",
      "😡Ira",
      "😒Desagrado"
    ],
    datasets: [
      {
        data: estadistica,
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

  const fechaHoy = new Date();
  const estadistica_emociones = (cantidad = 30) => {
    if(emociones?.length === 0) return
    const fecha_inicio = subtraerDias(fechaHoy, parseInt(cantidad))
    const fecha_fin = new Date();;
    const emociones_parametro = emociones.filter((emocion) =>{
        const fecha = emocion?.fecha.replace('-', '/')
        const fecha_emocion = new Date(fecha)
        if(fecha_emocion >= fecha_inicio && fecha_emocion <= fecha_fin){
          return emocion
        }
    })
    const emociones_valor = emociones_parametro.map((emocion) => (emocion?.valor))

    const estadisticas_data = [
      emociones_valor.filter((valor) => valor === 1)?.length,
      emociones_valor.filter((valor) => valor === 2)?.length,
      emociones_valor.filter((valor) => valor === 3)?.length,
      emociones_valor.filter((valor) => valor === 4)?.length,
      emociones_valor.filter((valor) => valor === 5)?.length,
    ]
    setEstadistica(estadisticas_data)
    console.log(estadistica);
  }

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

  useEffect(() => {
   estadistica_emociones(filtroEstadistica)
  }, [filtroEstadistica, emociones]);

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
                <select
                defaultValue={filtroEstadistica}
                onChange={(e) =>
                  setFiltroEstadistica(e.target.value)
                }>
                  <option value="30" >Último mes</option>
                  <option value="90">Últimos 3 meses</option>
                  <option value="180">Últimos 6 meses</option>
                  <option value="365">Último año</option>
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
