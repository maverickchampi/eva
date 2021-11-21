import React from "react";
import Background from "../components/atom/Background";

const Registro = () => {
  return (
    <div className="registro">
      <Background clase="back-registro" />
      <div className="registro-content">
        <div className="registro__item"></div>
        <div className="registro__item">
          <h1>Registrarse</h1>
          <form>
            <input type="text" placeholder="Nombre" name="nombre" />
            <input
              type="text"
              name="apellido_pa"
              placeholder="Apellido paterno"
            />
            <input
              type="text"
              name="apellido_ma"
              placeholder="Apellido maaterno"
            />
            <input type="date" name="fecha_nac" />
            <input type="email" name="correo" placeholder="Correo" />
            <input type="password" name="contraseni" placeholder="Contraseña" />
            <button>Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
