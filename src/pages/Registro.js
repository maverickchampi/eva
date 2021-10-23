import React from "react";
import { Link } from "react-router-dom";
import ImagenRegistro from "./../assets/images/ig_registro.svg";

const Registro = () => {
  return (
    <div className="registro auth">
      <div className="auth__item">
        <h2 className="titulo">Registro</h2>
        <form className="form-contenedor" method="post" action="">
          <div className="form__item">
            <div className="grupo-input">
              <i className="fas fa-signature"></i>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="nombre"
                requerid="true"
                autocomplete="nope"
              />
            </div>
            <div className="grupo-input">
              <i className="fas fa-signature"></i>
              <input
                type="text"
                name="apellido"
                id="apellido"
                placeholder="apellido"
                requerid="true"
                autocomplete="nope"
              />
            </div>
          </div>
          <div className="form__item">
            <div className="grupo-input">
              <i className="fas fa-calendar-day"></i>
              <input
                type="date"
                name="fecha_nacimiento"
                id="fecha_nacimiento"
                requerid="true"
              />
            </div>
            <div className="grupo-input">
              <i className="fas fa-id-card"></i>
              <input
                type="text"
                name="dni"
                id="dni"
                placeholder="dni"
                requerid="true"
                autocomplete="nope"
              />
            </div>
          </div>
          <div className="form__item">
            <div className="grupo-input">
              <i className="fas fa-user"></i>
              <input
                type="email"
                name="correo"
                id="correo"
                placeholder="correo"
                requerid="true"
                autocomplete="nope"
              />
            </div>
          </div>
          <div className="form__item">
            <div className="grupo-input">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="contrasenia"
                id="contrasenia"
                placeholder="contraseña"
                requerid="true"
              />
            </div>
          </div>
          <button className="boton mb-1 mt-4">Registrar</button>
        </form>
        <p className="link-registro">
          ¿Ya tiene una cuenta?
          <Link to="/login" className="link__item">
            Ingresar
          </Link>
        </p>
      </div>
      <div className="auth__item">
        <img
          src={ImagenRegistro}
          alt="imagen de registro"
          className="auth__item-img"
        />
      </div>
    </div>
  );
};

export default Registro;
