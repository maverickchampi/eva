import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import Background from "../components/atom/Background";
import { postLogin } from "../services/Usuario";

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

  return (
    <div className="login">
      <Background />
      <div className="login-content">
        <div className="login__item">
          <h2></h2>
        </div>
        <div className="login__item">
          <div className="login-formulario">
            <h1 className="titulo">
              <span>Iniciar Sesión</span>
            </h1>
            <form onSubmit={(e) => handleLogin(e)}>
              <div className="form-group">
                <label htmlFor="correo">Email</label>
                <input
                  type="email"
                  name="correo"
                  placeholder="Correo"
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
                  type="text"
                  name="contrasenia"
                  placeholder="Contraseña"
                  value={usuario.contrasenia}
                  required
                  onChange={(e) =>
                    setUsuario({ ...usuario, contrasenia: e.target.value })
                  }
                />
              </div>
              <Link to="#">¿Has olvidado tu contraseña?</Link>
              <button>Ingresar</button>
            </form>
            <div className="login-api">
              <div className="api__item google">
                <i class="fab fa-google"></i>
                <p>Ingresar con Google</p>
              </div>
              <div className="api__item facebook">
                <i class="fab fa-facebook"></i>
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
