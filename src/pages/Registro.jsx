import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
          if (response.mensaje === "Se registró correctamente.") {
            swal("Éxito", "Registro completado", "success");
            setTimeout(() => {
              history.push("/login");
            }, 2000);
          } else {
            swal(
              "Opps!",
              "Correo ya registrado, intentelo nuevamente",
              "error"
            );
          }
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
        <img
          src="https://i.ibb.co/RzdYqyB/eva.png"
          alt="eva"
          className="registro-img"
        />
        <div className="registro__item">
          <div className="formulario-content">
            <h1 className="titulo">
              <span>Registráte</span>
            </h1>
            <form onSubmit={(e) => handleRegistro(e)}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  onChange={(e) =>
                    setUsuario({ ...usuario, nombre: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="nombre">Apellido Paterno</label>
                <input
                  type="text"
                  name="apellido_pa"
                  onChange={(e) =>
                    setUsuario({ ...usuario, apellidoPa: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="nombre">Apellido Materno</label>
                <input
                  type="text"
                  name="apellido_ma"
                  onChange={(e) =>
                    setUsuario({ ...usuario, apellidoMa: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="fecha_nac">Fecha de nacimiento</label>
                <input
                  type="date"
                  name="fecha_nac"
                  onChange={(e) =>
                    setUsuario({ ...usuario, fechaNaci: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label name="correo"> Correo</label>
                <input
                  type="email"
                  name="correo"
                  onChange={(e) =>
                    setUsuario({ ...usuario, correo: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label name="contrasenia"> Contraseña</label>
                <input
                  type="password"
                  name="contrasenia"
                  onChange={(e) =>
                    setUsuario({ ...usuario, contrasenia: e.target.value })
                  }
                />
              </div>
              <button type="submit">Registrar</button>
              <h5 className="titulo-registrar">
                ¿Ya tienes una cuentas registrada?
                <Link to="/login">Ingresa</Link>
              </h5>
            </form>
          </div>
        </div>
        <div className="registro__item"></div>
      </div>
    </div>
  );
};

export default Registro;
