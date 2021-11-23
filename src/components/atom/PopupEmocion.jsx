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
        <li className="orden-li" onClick={() => eligeEmocion(5)}>
          <img
            className="img off"
            src="https://i.ibb.co/KwqDmdB/care-128x128-1991058.png"
            alt="emocion"
          />
        </li>
        <li className="orden-li" onClick={() => eligeEmocion(4)}>
          <img
            className="img off"
            src="https://i.ibb.co/R00NP2K/haha-128x128-1991060.png"
            alt="emocion"
          />
        </li>
        <li className="orden-li" onClick={() => eligeEmocion(3)}>
          <img
            className="img off"
            src="https://i.ibb.co/HTQDtYZ/wow-128x128-1991062.png"
            alt="emocion"
          />
        </li>
        <li className="orden-li" onClick={() => eligeEmocion(2)}>
          <img
            className="img off"
            src="https://i.ibb.co/2MzMS6d/sad-128x128-1991063.png"
            alt="emocion"
          />
        </li>
        <li className="orden-li" onClick={() => eligeEmocion(1)}>
          <img
            className="img off"
            src="https://i.ibb.co/LPNbLCx/angry-128x128-1991061.png"
            alt="emocion"
          />
        </li>
      </ul>
    </div>
  );
};

export default PopupEmocion;
