import React, { useState } from "react";
import HeaderDashboard from "../layout/HeaderDashboard";
import swal from "sweetalert";
import { putData } from "../services/login";
import { user as info } from "../constants/metodos";

const Perfil = () => {
  const [file, setFile] = useState({ filepreview: null });
  const [user, setUser] = useState(
    JSON.parse(atob(sessionStorage.getItem(btoa("user")))) || {}
  );
  const [name, setName] = useState({
    name: info()?.nombre,
    apellido: info()?.apaterno,
  });

  const handleUpdate = (e) => {
    e.preventDefault();

    putData(JSON.stringify(user))
      .then((response) => {
        swal("Éxito", "Información actualizada", "success");
        sessionStorage.setItem(btoa("user"), btoa(JSON.stringify(user)));
        document.getElementById("contrasenia").value = "";
        setName({ name: info()?.nombre, apellido: info()?.apaterno });
      })
      .catch((error) =>
        swal("Opps!", "Error al actualizar, intentelo nuevamente", "error")
      );
  };
  return (
    <div className="perfil">
      <HeaderDashboard usuario={`${name.name} ${name.apellido}`} />
      <div className="perfil-contenedor">
        <div className="perfil__item">
          <div className="card card-informacion">
            <form className="form-informacion" onSubmit={handleUpdate}>
              <h3 className="titulo">Información personal</h3>
              <div className="form-grupo">
                <p>Nombre</p>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="nombre"
                  value={user?.nombre}
                  onChange={(e) => setUser({ ...user, nombre: e.target.value })}
                  required
                />
              </div>
              <div className="form-grupo">
                <p>Apellido paterno</p>
                <input
                  type="text"
                  name="apaterno"
                  id="apaterno"
                  placeholder="apellido paterno"
                  value={user?.apaterno}
                  onChange={(e) =>
                    setUser({ ...user, apaterno: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-grupo">
                <p>Apellido materno</p>
                <input
                  type="text"
                  name="amaterno"
                  id="amaterno"
                  placeholder="apellido materno"
                  value={user?.amaterno}
                  onChange={(e) =>
                    setUser({ ...user, amaterno: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-grupo">
                <p>Fecha de nacimiento</p>
                <input
                  type="date"
                  name="fechaNacimiento"
                  id="fechaNacimiento"
                  value={user?.fechaNacimiento}
                  onChange={(e) =>
                    setUser({ ...user, fechaNacimiento: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-grupo">
                <p>Sexo</p>
                <select
                  name="sexo"
                  onChange={(e) => setUser({ ...user, sexo: e.target.value })}
                >
                  <option value="S" selected={user.sexo === "S" ? true : false}>
                    Sin definir
                  </option>
                  <option value="M" selected={user.sexo === "M" ? true : false}>
                    Masculino
                  </option>
                  <option value="F" selected={user.sexo === "F" ? true : false}>
                    Femenino
                  </option>
                </select>
              </div>
              <div className="form-grupo">
                <p>Alias</p>
                <input
                  type="text"
                  name="alias"
                  id="alias"
                  value={user?.alias}
                  onChange={(e) => setUser({ ...user, alias: e.target.value })}
                  placeholder="alias"
                />
              </div>
              <div className="form-grupo">
                <p>Correo</p>
                <input
                  type="text"
                  name="correo"
                  id="correo"
                  value={user?.correo}
                  disabled="true"
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
                  minLength="8"
                  onChange={(e) =>
                    setUser({ ...user, contrasenia: e.target.value })
                  }
                  placeholder="contraseña"
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
