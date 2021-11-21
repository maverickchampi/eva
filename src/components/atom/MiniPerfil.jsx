import React from "react";
import { Chart } from "primereact/chart";

const MiniPerfil = ({ user }) => {
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
        data: user.calendarioAnimos,
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
  return (
    <div className="miniperfil">
      <section className="informacion">
        <div className="content__title">
          <div className="content__img">
            <img src={user.foto} alt="Foto de perfil" />
          </div>
          <div>
            <h1>{`${user.name} ${user.lastname}`}</h1>
            <label>
              <i className="fas fa-map-marker-alt"></i> Lima, Perú
            </label>
          </div>
        </div>
        <div className="content__subtitle">
          <div>
            <label className="top">{user.posts}</label>
            <label className="sub">posts</label>
          </div>
          <div>
            <label className="top">{user.aportes}</label>
            <label className="sub">aportes</label>
          </div>
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
          <h2>Estado de ánimo en los últimos 6 meses</h2>
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
