import React from "react";
import { Link } from "react-router-dom";
import IconoFb from "./../assets/icons/fb_logo.svg";
import IconoGoogle from "./../assets/icons/google_logo.png";
import ImagenLogin from "./../assets/images/ig_login.svg";

const Login = () => {
  return (
    <div className="login auth">
      <div className="auth__item">
        <img src={ImagenLogin} alt="" className="auth__item-img" />
      </div>
      <div className="auth__item">
        <h2 className="titulo">Iniciar Sesión</h2>
        <form className="form-contenedor">
          <div className="grupo-input">
            <i className="fas fa-user"></i>
            <input type="text" name="correo" id="correo" placeholder="correo" />
          </div>
          <div className="grupo-input">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="contrasenia"
              id="contrasenia"
              placeholder="contraseña"
            />
          </div>
          <Link to="#" className="link-password">
            ¿Te has olvidado tu contraseña?
          </Link>
          <button className="boton mb-1 mt-4">Ingresar</button>
        </form>
        <p className="link-registro">
          ¿No tienes una cuenta?
          <Link to="/registro" className="link__item">
            Registrar
          </Link>
        </p>
        <div className="api-contenedor">
          <div className="api__item">
            <img src={IconoGoogle} alt="icono de google" />
          </div>
          <div className="api__item">
            <img src={IconoFb} alt="icono de facebook" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
