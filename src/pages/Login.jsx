import React from "react";
import Background from "../components/atom/Background";

const Login = () => {
  return (
    <div className="login">
      <Background />
      <div className="login-content">
        <div className="login__item"></div>
        <div className="login__item">
          <h1>Login</h1>
          <form>
            <input type="email" name="correo" />
            <input type="text" name="contrasenia" />
            <button>Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
