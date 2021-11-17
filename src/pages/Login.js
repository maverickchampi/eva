import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import IconoFb from "./../assets/icons/fb_logo.svg";
import IconoGoogle from "./../assets/icons/google_logo.png";
import ImagenLogin from "./../assets/images/ig_login.svg";
import swal from "sweetalert";
import { postLogin, postRegister } from "../services/login";
import GoogleLogin from "react-google-login";

const Login = () => {
  let history = useHistory();
  const [login, setLogin] = useState({ correo: null, contrasenia: null });

  useEffect(() => {
    if (document.getElementsByClassName("WACLauncher__Button").length !== 0) {
      for (
        let i = 0;
        i < document.getElementsByClassName("WACLauncher__Button").length;
        i++
      ) {
        document
          .getElementsByClassName("WACLauncher__Button")
          [i].classList.add("d-none");
      }
    }
  }, []);

  const submitLogin = (e) => {
    e.preventDefault();

    postLogin(JSON.stringify(login))
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

  const responseGoogle = (user) => {
    const usuario = {
      nombre: user.profileObj.givenName,
      apaterno: user.profileObj.familyName,
      amaterno: user.profileObj.familyName,
      fechaNacimiento: null,
      correo: user.profileObj.email,
      contrasenia: user.profileObj.email,
      estado: 1,
      alias: "",
      sexo: "S",
      foto: user.profileObj.imageUrl,
      calendarioAnimo: [],
      calendarioEmociones: [],
    }

    postLogin(JSON.stringify({correo: usuario.correo, contrasenia: usuario.contrasenia}))
      .then((response) => {
        if (response.mensaje !== "Credenciales no válidas") {
          console.log(response.correo);
          sessionStorage.setItem(
            btoa("user"),
            btoa(JSON.stringify(response.correo))
          );
          history.push("/dashboard");
        } else {
          postRegister(JSON.stringify(usuario))
          .then((response) => {
            console.log(response);
            postLogin(JSON.stringify({correo: usuario.correo, contrasenia: usuario.contrasenia}))
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
      })
      .catch((error) =>
        swal("Opps!", "Error al registrar, intentelo nuevamente", "error")
      );
        }
      })

    
  };

  const errGoogle = () => {
    swal("Opps!", "Error al ingresar con google, intentelo nuevamente", "error")
  }
  

  return (
    <div className="login auth">
      <div className="auth__item">
        <img src={ImagenLogin} alt="" className="auth__item-img" />
      </div>
      <div className="auth__item">
        <h2 className="titulo">Iniciar Sesión</h2>
        <form className="form-contenedor" onSubmit={submitLogin}>
          <div className="grupo-input">
            <i className="fas fa-user"></i>
            <input
              type="email"
              name="correo"
              id="correo"
              placeholder="correo"
              required
              onChange={(e) => setLogin({ ...login, correo: e.target.value })}
            />
          </div>
          <div className="grupo-input">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="contrasenia"
              onChange={(e) =>
                setLogin({ ...login, contrasenia: e.target.value })
              }
              id="contrasenia"
              placeholder="contraseña"
              required
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
          <GoogleLogin
            clientId="47155732943-hsta3sd0ae54v1dmncj53k9dbfujuh16.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={() => errGoogle()}
            cookiePolicy={'single_host_origin'}
          />
          <div className="api__item">
            <img src={IconoFb} alt="icono de facebook" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
