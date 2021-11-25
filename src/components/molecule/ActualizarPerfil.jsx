import React, { useRef, useState } from "react";
import swal from "sweetalert";
import { putData, subirFoto } from "../../services/Usuario";

const ActualizarPerfil = ({ edit, setEdit, user, setUser }) => {
  const [file, setFile] = useState({
    url: null,
    imagen: null,
  });
  const [userEdit, setUserEdit] = useState({ ...user, contrasenia: "" });

  const myForm = useRef();

  const editar = async (e) => {
    e.preventDefault();
    if (
      userEdit.nombre !== "" &&
      userEdit.apellidoPa !== "" &&
      userEdit.apellidoMa !== "" &&
      userEdit.fechaNaci !== ""
    ) {
      if (file.url !== null && file.imagen !== null) {
        console.log("Se actualiza foto");

        await subirFoto(file.imagen)
          .then((res) => {
            userEdit.foto = res.data.url;
            setFile({
              url: null,
              imagen: null,
            });
          })
          .catch((err) => {
            swal("Error", "Error al actualizar foto", "error");
          });
      }

      if (userEdit.contrasenia.length > 0) {
        if (userEdit.contrasenia.length >= 8) {
          // console.log("Se actualiza contraseña");
          putData(JSON.stringify(userEdit))
            .then((res) => {
              setUser(userEdit);
              sessionStorage.setItem(
                btoa("user"),
                btoa(JSON.stringify(userEdit))
              );
              swal("Éxito", "Tu perfil ha sido actualizado", "success");
              setEdit(true);
              try {
                document.getElementById("pass-edit").value = "";
              } catch {}
            })
            .catch((err) => {
              swal("Error", "Error al actualizar contraseña", "error");
            });
        } else {
          swal("", "La contraseña debe tener al menos 8 caracteres", "info");
        }
        setFile({
          url: null,
          imagen: null,
        });
      } else {
        userEdit.contrasenia = user.contrasenia;
        putData(JSON.stringify(userEdit))
          .then((res) => {
            setUser(userEdit);
            sessionStorage.setItem(
              btoa("user"),
              btoa(JSON.stringify(userEdit))
            );
            swal("Éxito", "Tu perfil ha sido actualizado", "success");
            setEdit(true);
            try {
              document.getElementById("pass-edit").value = "";
            } catch {}
          })
          .catch((err) => {
            swal("Error", "Error al actualizar contraseña", "error");
          });
      }
      setFile({
        url: null,
        imagen: null,
      });
    } else {
      swal("Error", "Todos los campos son obligatorios", "error");
    }
  };

  const cancelar = () => {
    myForm.current.reset();
    document.getElementById("file").value = "";
    setFile({
      url: null,
      imagen: null,
    });
    setUserEdit({ ...user, contrasenia: "" });
    setEdit(true);
  };

  return (
    <div className="actualizar-perfil">
      <h2>
        <span>Mis datos personales</span>
      </h2>
      <div className="formulario-perfil">
        <div className="card card-foto">
          <img
            className="foto-preview"
            src={file.url || userEdit.foto}
            alt={file.url || userEdit.foto}
          />
          <div className="foto-contenedor">
            <input
              type="file"
              name="file"
              id="file"
              className="foto-input"
              disabled={edit}
              onChange={(e) => {
                try {
                  setFile({
                    url: URL.createObjectURL(e.target.files[0]),
                    imagen: e.target.files[0],
                  });
                } catch (err) {
                  setFile({
                    url: null,
                    imagen: null,
                  });
                }
              }}
              accept="image/*"
              data-multgit
              aiple-caption=""
              multiple
            />
            {!edit && (
              <label for="file">
                <figure>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="iborrainputfile"
                    width="20"
                    height="17"
                    viewBox="0 0 20 17"
                  >
                    <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
                  </svg>
                </figure>
              </label>
            )}
          </div>
        </div>
        <form ref={myForm}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              name="nombre"
              required
              readOnly={edit}
              defaultValue={userEdit.nombre}
              onChange={(e) =>
                setUserEdit({ ...userEdit, nombre: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellido_pat">Apellido Paterno</label>
            <input
              type="text"
              name="apellido_pat"
              required
              readOnly={edit}
              defaultValue={userEdit.apellidoPa}
              onChange={(e) =>
                setUserEdit({ ...userEdit, apellidoPa: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellido_mat">Apellido Materno</label>
            <input
              type="text"
              name="apellido_mat"
              required
              readOnly={edit}
              defaultValue={userEdit.apellidoMa}
              onChange={(e) =>
                setUserEdit({ ...userEdit, apellidoMa: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="fecha_nac">Fecha de nacimiento</label>
            <input
              type="date"
              name="fecha_nac"
              required
              readOnly={edit}
              defaultValue={userEdit.fechaNaci}
              onChange={(e) =>
                setUserEdit({ ...userEdit, fechaNaci: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="sexo">Sexo</label>
            <select
              name="sexo"
              disabled={edit}
              defaultValue={userEdit.sexo}
              onChange={(e) =>
                setUserEdit({ ...userEdit, sexo: e.target.value })
              }
            >
              <option value="S">Sin definir</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="celular">Celular</label>
            <input
              type="number"
              name="celular"
              readOnly={edit}
              defaultValue={userEdit.telefono}
              onChange={(e) =>
                setUserEdit({ ...userEdit, telefono: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo</label>
            <input
              type="text"
              name="correo"
              readOnly={true}
              defaultValue={userEdit.correo}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contrasenia">Contraseña</label>
            <input
              type="password"
              id="pass-edit"
              name="contrasenia"
              readOnly={edit}
              placeholder="********"
              onChange={(e) =>
                setUserEdit({ ...userEdit, contrasenia: e.target.value })
              }
            />
          </div>
          {!edit && (
            <div className="botones">
              <button onClick={(e) => editar(e)} className="btn-save">
                Guardar
              </button>
              <button
                type="button"
                onClick={() => cancelar()}
                className="btn-cancelar"
              >
                Cancelar
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ActualizarPerfil;
