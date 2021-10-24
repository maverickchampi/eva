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
            <input
              type="file"
              name="myImage"
              className="foto-boton"
              onChange={(e) =>
                setFile({ filepreview: URL.createObjectURL(e.target.files[0]) })
              }
            />
            <img className="foto-preview" src={file.filepreview} />
          </div>
          <div className="card card-permiso"></div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
