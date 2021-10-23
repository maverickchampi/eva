import React from "react";
import { Link } from "react-router-dom";
import ImagenLogin from "./../assets/images/ig_login.svg";

const Registro = () => {
  return (
    <div className="registro auth">
      <div className="auth__item">
        <img src={ImagenLogin} alt="" className="auth__item-img" />
      </div>
      <div className="auth__item">
        <h2 className="titulo">Iniciar Sesión</h2>
        <form className="form-contenedor">
          <div className="grupo-input">
            <i className="fas fa-user"></i>
            <input type="text" name="correo" id="correo" value="madeliyricra" />
          </div>
          <div className="grupo-input">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="contrasenia"
              id="contrasenia"
              value="12345687"
            />
          </div>
          <Link to="#" className="link-password">
            ¿Te has olvidado tu contraseña?
          </Link>
          <button className="boton mb-1 mt-4">Ingresar</button>
        </form>
        <p className="link-registro">
          ¿No tienes una cuenta?
          <Link to="#" className="link__item">
            Registrar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registro;
