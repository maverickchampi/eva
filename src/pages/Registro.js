import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { postRegister } from "../services/login";
import ImagenRegistro from "./../assets/images/ig_registro.svg";

const Registro = () => {
  const [user, setUser] = useState({
    nombre: null,
    apaterno: null,
    amaterno: null,
    fechaNacimiento: null,
    correo: null,
    contrasenia: null,
    estado: 1,
    alias: "",
    sexo: null,
    calendarioAnimo: [],
    calendarioEmociones: [],
  });

  const register = (e) => {
    e.preventDefault();

    postRegister(JSON.stringify(user))
      .then((response) => {
        swal("Éxito", "Registro completado", "success");
        document.getElementById("form-registro").reset();
      })
      .catch((error) =>
        swal("Opps!", "Error al registrar, intentelo nuevamente", "error")
      );
  };

  return (
    <div className="registro auth">
      <div className="auth__item">
        <h2 className="titulo">Registro</h2>
        <form
          id="form-registro"
          className="form-contenedor"
          onSubmit={register}
        >
          <div className="form__item">
            <div className="grupo-input">
              <i className="fas fa-signature"></i>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="nombre"
                required
                minLength="2"
                maxLength="30"
                onChange={(e) => setUser({ ...user, nombre: e.target.value })}
              />
            </div>
            <div className="grupo-input">
              <i className="fas fa-signature"></i>
              <input
                type="text"
                name="apaterno"
                id="apaterno"
                placeholder="apaterno"
                minLength="2"
                maxLength="30"
                onChange={(e) => setUser({ ...user, apaterno: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form__item">
            <div className="grupo-input">
              <i className="fas fa-signature"></i>
              <input
                type="text"
                name="amaterno"
                id="amaterno"
                minLength="2"
                maxLength="30"
                onChange={(e) => setUser({ ...user, amaterno: e.target.value })}
                placeholder="amaterno"
                required
              />
            </div>
            <div className="grupo-input">
              <i className="fas fa-calendar-day"></i>
              <input
                type="date"
                name="fechaNacimiento"
                id="fechaNacimiento"
                onChange={(e) =>
                  setUser({ ...user, fechaNacimiento: e.target.value })
                }
                required
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
                onChange={(e) => setUser({ ...user, correo: e.target.value })}
                placeholder="correo"
                required
              />
            </div>
          </div>
          <div className="form__item">
            <div className="grupo-input">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="contrasenia"
                minLength="4"
                maxLength="12"
                onChange={(e) =>
                  setUser({ ...user, contrasenia: e.target.value })
                }
                id="contrasenia"
                placeholder="contraseña"
                required
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
