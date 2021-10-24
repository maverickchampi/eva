import React, { useState } from "react";
import HeaderDashboard from "../layout/HeaderDashboard";

const Perfil = () => {
  const [file, setFile] = useState({filepreview: null});
  return (
    <div className="perfil">
      <HeaderDashboard usuario="Madeliy Ricra" />
      <div className="perfil-contenedor">
        <div className="perfil__item">
          <div className="card card-informacion">
            <form className="form-informacion">
              <h3 className="titulo">Información personal</h3>
              <div className="form-grupo">
                <p>Nombre</p>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="nombre"
                  required
                />
              </div>
              <div className="form-grupo">
                <p>Apellido paterno</p>
                <input
                  type="text"
                  name="apellidoPat"
                  id="apellidoPat"
                  placeholder="apellido paterno"
                  required
                />
              </div>
              <div className="form-grupo">
                <p>Apellido materno</p>
                <input
                  type="text"
                  name="apellidoMat"
                  id="apellidoMat"
                  placeholder="apellido materno"
                  required
                />
              </div>
              <div className="form-grupo">
                <p>Fecha de nacimiento</p>
                <input
                  type="date"
                  name="fecha_nacimiento"
                  id="fecha_nacimiento"
                  required
                />
              </div>
              <div className="form-grupo">
                <p>Sexo</p>
                <select name="select">
                  <option value="m">Masculino</option>
                  <option value="f">Femenino</option>
                </select>
              </div>
              <div className="form-grupo">
                <p>Alias</p>
                <input
                  type="text"
                  name="alias"
                  id="alias"
                  placeholder="alias"
                />
              </div>
              <div className="form-grupo">
                <p>Correo</p>
                <input
                  type="text"
                  name="correo"
                  id="correo"
                  placeholder="correo"
                  required
                />
              </div>
              <div className="form-grupo">
                <p>Contraseña</p>
                <input
                  type="password"
                  name="contrasenia"
                  id="contrasenia"
                  placeholder="contraseña"
                  required
                />
              </div>
              <div className="boton-contenedor">
                <button className="boton">Guardar datos</button>
              </div>
            </form>
          </div>
        </div>
        <div className="perfil__item">
          <div className="card card-foto">
            <input type="file" name="myImage" className="foto-boton"
             onChange= {(e)=>setFile({filepreview: URL.createObjectURL(e.target.files[0])})} />
            <img className="foto-preview" src={file.filepreview}/>
          </div>
          <div className="card card-permiso"></div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
