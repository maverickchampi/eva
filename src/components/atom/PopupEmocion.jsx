import React from "react";
import { postEmocion } from "../../services/Emocion";
import swal from "sweetalert";

const PopupEmocion = ({
  user,
  setUser,
  reference,
  emocionUltima,
  emocionesUltimas,
  setEmocionesUltimas,
  setEmocionUltima,
  cargarEmociones,
}) => {
  const eligeEmocion = (value) => {
    const json = {
      emocion: {
        usuario: { id: user.id },
        valor: value,
      },
      login: {
        correo: user.correo,
        contrasenia: user.contrasenia,
      },
    };

    if (emocionUltima.id !== undefined) {
      json.emocion.id = emocionUltima.id;
      json.emocion.fecha = emocionUltima.fecha;
    }

    reference.current.classList.remove("popup-show");

    postEmocion(JSON.stringify(json)).then((resp) => {
      swal("Listo!", "Emoción guardada", "success");
      cargarEmociones();
    });
  };

  return (
    <div className="popupEmocion" ref={reference}>
      <ul className="orden">
        <li className="orden-li" onClick={() => eligeEmocion(1)}>
          <p className="img off">😊</p>
        </li>
        <li className="orden-li" onClick={() => eligeEmocion(2)}>
          <p className="img off">🥺</p>
        </li>
        <li className="orden-li" onClick={() => eligeEmocion(3)}>
          <p className="img off">😧</p>
        </li>
        <li className="orden-li" onClick={() => eligeEmocion(4)}>
          <p className="img off">😡</p>
        </li>
        <li className="orden-li" onClick={() => eligeEmocion(5)}>
          <p className="img off">😒</p>
        </li>
      </ul>
    </div>
  );
};

export default PopupEmocion;
