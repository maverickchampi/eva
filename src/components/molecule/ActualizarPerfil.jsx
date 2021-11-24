import React, { useState } from "react";

const ActualizarPerfil = () => {
  const [file, setFile] = useState({ filepreview: null });
  return (
    <div className="actualizar-perfil">
      <h2>Actualizar Perfil</h2>
      <div className="formulario-perfil">
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
              data-multgit
              aiple-caption=""
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
        <form>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" name="nombre" required />
          </div>
          <div className="form-group">
            <label htmlFor="apellido_pat">Apellido Paterno</label>
            <input type="text" name="apellido_pat" required />
          </div>
          <div className="form-group">
            <label htmlFor="apellido_mat">Apellido Materno</label>
            <input type="text" name="apellido_mat" required />
          </div>
          <div className="form-group">
            <label htmlFor="fecha_nac">Fecha de nacimiento</label>
            <input type="date" name="fecha_nac" required />
          </div>
          <div className="form-group">
            <label htmlFor="sexo">Sexo</label>
            <select>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="celular">Celular</label>
            <input type="number" name="celular" />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo</label>
            <input type="text" name="correo" required />
          </div>
          <div className="form-group">
            <label htmlFor="contrasenia">Contraseña</label>
            <input type="password" name="contrasenia" />
          </div>
          <button>Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default ActualizarPerfil;
