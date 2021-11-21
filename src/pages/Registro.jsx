import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import Background from "../components/atom/Background";
import { postRegister } from "../services/Usuario";

const Registro = () => {
  let history = useHistory();
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellidoPa: "",
    apellidoMa: "",
    correo: "",
    contrasenia: "",
    fechaNaci: "",
    estado: true,
    sexo: "S",
  });

  const handleRegistro = (e) => {
    e.preventDefault();
    if (
      usuario.nombre !== "" &&
      usuario.apellidoPa !== "" &&
      usuario.apellidoMa !== "" &&
      usuario.correo !== "" &&
      usuario.contrasenia !== "" &&
      usuario.fechaNaci !== ""
    ) {
      postRegister(JSON.stringify(usuario))
        .then((response) => {
          swal("Éxito", "Registro completado", "success");
          setTimeout(() => {
            history.push("/login");
          }, 2000);
        })
        .catch((error) =>
          swal("Opps!", "Error al registrar, intentelo nuevamente", "error")
        );
    } else {
      swal("Opps!", "Error al registrar, intentelo nuevamente", "error");
    }
  };

  return (
    <div className="registro">
      <Background clase="back-registro" />
      <div className="registro-content">
        <div className="registro__item"></div>
        <div className="registro__item">
          <h1>Registrarse</h1>
          <form onSubmit={(e) => handleRegistro(e)}>
            <input
              type="text"
              placeholder="Nombre"
              name="nombre"
              onChange={(e) =>
                setUsuario({ ...usuario, nombre: e.target.value })
              }
            />
            <input
              type="text"
              name="apellido_pa"
              placeholder="Apellido paterno"
              onChange={(e) =>
                setUsuario({ ...usuario, apellidoPa: e.target.value })
              }
            />
            <input
              type="text"
              name="apellido_ma"
              placeholder="Apellido maaterno"
              onChange={(e) =>
                setUsuario({ ...usuario, apellidoMa: e.target.value })
              }
            />
            <input
              type="date"
              name="fecha_nac"
              onChange={(e) =>
                setUsuario({ ...usuario, fechaNaci: e.target.value })
              }
            />
            <input
              type="email"
              name="correo"
              placeholder="Correo"
              onChange={(e) =>
                setUsuario({ ...usuario, correo: e.target.value })
              }
            />
            <input
              type="password"
              name="contrasenia"
              placeholder="Contraseña"
              onChange={(e) =>
                setUsuario({ ...usuario, contrasenia: e.target.value })
              }
            />
            <input type="submit" value="Registrar" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
