import React, { useState } from "react";
import HeaderDashboard from "../layout/HeaderDashboard";

const Perfil = () => {
  const [file, setFile] = useState({ filepreview: null });
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
            <img className="foto-preview" src={file.filepreview} />
            <div className="foto-contenedor">
              <input
                type="file"
                name="file"
                id="file"
                className="foto-input"
                onChange={(e) =>
                  setFile({
                    filepreview: URL.createObjectURL(e.target.files[0]),
                  })
                }
                data-multiple-caption=""
                multiple
              />
              <label for="file">
                <figure>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="iborrainputfile"
                    width="20"
                    height="17"
                    viewBox="0 0 20 17"
                  >
                    <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
                  </svg>
                </figure>
              </label>
            </div>
          </div>
          <div className="card card-permiso"></div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
