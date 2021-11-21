import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
        <div className="login__item"></div>
        <div className="login__item">
          <h1>Login</h1>
          <form onSubmit={(e) => handleLogin(e)}>
            <input
              type="email"
              name="correo"
              value={usuario.correo}
              required
              onChange={(e) =>
                setUsuario({ ...usuario, correo: e.target.value })
              }
            />
            <input
              type="password"
              name="contrasenia"
              value={usuario.contrasenia}
              required
              onChange={(e) =>
                setUsuario({ ...usuario, contrasenia: e.target.value })
              }
            />
            <button>Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
