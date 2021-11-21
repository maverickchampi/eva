import React from "react";
import { Link } from "react-router-dom";
import Background from "../components/atom/Background";

const Login = () => {
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
            <form>
              <div className="form-group">
                <label htmlFor="correo">Email</label>
                <input type="email" name="correo" placeholder="Correo" />
              </div>
              <div className="form-group">
                <label htmlFor="contrasenia">Contraseña</label>
                <input
                  type="text"
                  name="contrasenia"
                  placeholder="Contraseña"
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
