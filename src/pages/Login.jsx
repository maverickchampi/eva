import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import Background from "../components/atom/Background";
import { postLogin, recuperaUsuario } from "../services/Usuario";

const Login = () => {
  let history = useHistory();
  const [usuario, setUsuario] = useState({ correo: "", contrasenia: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    postLogin(JSON.stringify(usuario))
      .then((response) => {
        if (response.mensaje !== "Credenciales no válidas") {
          console.log(response.correo);
          sessionStorage.setItem(
            btoa("user"),
            btoa(JSON.stringify(response.correo))
          );
          history.push("/dashboard");
        } else {
          swal(
            "Opps!",
            "Credenciales inválidas, intentelo nuevamente",
            "error"
          );
        }
      })
      .catch((error) =>
        swal("Opps!", "Error al ingresar, intentelo nuevamente", "error")
      );
  };

  const handleRecuperar = () => {
    swal({
      title: "Ingrese su correo",
      content: "input",
    }).then((value) => {
      if (value) {
        recuperaUsuario(JSON.stringify({ correo: value }))
          .then((response) => {
            swal("Listo!", "Contraseña enviada a su correo", "success");
          })
          .catch((error) =>
            swal("Opps!", "Error al enviar, intentelo nuevamente", "error")
          );
      }
    });
  };

  return (
    <div className="login">
      <Background />
      <div className="login-content">
        <img
          src="https://i.ibb.co/RzdYqyB/eva.png"
          alt="eva"
          className="login-img"
        />
        <div className="login__item"></div>
        <div className="login__item">
          <div className="formulario-content">
            <h1 className="titulo">
              <span>Iniciar Sesión</span>
            </h1>
            <form onSubmit={(e) => handleLogin(e)}>
              <div className="form-group">
                <label htmlFor="correo">Email</label>
                <input
                  type="email"
                  name="correo"
                  value={usuario.correo}
                  required
                  onChange={(e) =>
                    setUsuario({ ...usuario, correo: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="contrasenia">Contraseña</label>
                <input
                  type="password"
                  name="contrasenia"
                  value={usuario.contrasenia}
                  required
                  onChange={(e) =>
                    setUsuario({ ...usuario, contrasenia: e.target.value })
                  }
                />
              </div>
              <Link
                to="#"
                onClick={() => handleRecuperar()}
                className="titulo-contrasenia"
              >
                ¿Has olvidado tu contraseña?
              </Link>
              <button>Ingresar</button>
              <h5 className="titulo-registrar">
                ¿No cuentas con una cuenta?{" "}
                <Link to="/registro">Registrate</Link>
              </h5>
            </form>
            <div className="login-api">
              <div className="api__item google">
                <i className="fab fa-google"></i>
                <p>Ingresar con Google</p>
              </div>
              <div className="api__item facebook">
                <i className="fab fa-facebook"></i>
                <p>Ingresar con Facebook</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
