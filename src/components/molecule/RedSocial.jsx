import React, { useEffect, useRef, useState } from "react";
import PopupEmocion from "../atom/PopupEmocion";
import swal from "sweetalert";

const RedSocial = ({ user, setUser, busqueda, setBusqueda }) => {
  const [showStop, setShowStop] = useState(false);
  const [rec, setRec] = useState(null);
  const popup = useRef();

  const handleMicrophone = () => {
    if (!("webkitSpeechRecognition" in window)) {
      swal("Opps!", "API no soportada", "error");
    } else {
      rec.lang = "es-PE";
      rec.continue = true;
      rec.interim = true;
      rec.addEventListener("result", (e) => {
        for (let i = e.resultIndex; i < e.results.length; i++) {
          setBusqueda(e.results[i][0].transcript);
          document.getElementById("busqueda").value =
            e.results[i][0].transcript;
        }
      });
      rec.start();
    }
  };

  const stopMicrophone = () => {
    rec.stop();
  };

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      // swal("Opps!", "API no soportada", "error");
    } else {
      let SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      let rec = new SpeechRecognition();
      setRec(rec);

      rec.onstart = function () {
        setShowStop(true);
      };
      rec.onend = function () {
        setShowStop(false);
      };
    }
  }, []);

  const urlEmocion = (emocion) => {
    switch (emocion) {
      case 1:
        return "https://i.ibb.co/R00NP2K/haha-128x128-1991060.png";
      case 2:
        return "https://i.ibb.co/KwqDmdB/care-128x128-1991058.png";
      case 3:
        return "https://i.ibb.co/HTQDtYZ/wow-128x128-1991062.png";
      case 4:
        return "https://i.ibb.co/2MzMS6d/sad-128x128-1991063.png";
      case 5:
        return "https://i.ibb.co/LPNbLCx/angry-128x128-1991061.png";
      case 0:
        return "https://i.pinimg.com/originals/2a/74/0f/2a740fea4967adb34b738012ecf37ccb.png";
    }
  };

  const eligeEmocion = () => {
    popup.current.classList.toggle("popup-show");
  };

  return (
    <div className="red-social">
      <div className="ultimas-emociones">
        <ul>
          {user.semanaEmociones.map((emocion, key) => (
            <li
              key={key}
              className={key === 6 ? "active on" : "no-today"}
              onClick={() => (key === 6 ? eligeEmocion() : "")}
            >
              <img src={urlEmocion(emocion)} alt="emocion" />
            </li>
          ))}
        </ul>
      </div>
      <div className="search">
        <i class="fas fa-search"></i>
        <input
          type="text"
          placeholder="Buscar..."
          id="busqueda"
          onChange={(e) => setBusqueda(e.target.value)}
        />
        {showStop ? (
          <button onClick={() => stopMicrophone()}>
            <i class="fas fa-square"></i>
          </button>
        ) : (
          <button onClick={() => handleMicrophone()}>
            <i class="fas fa-microphone"></i>
          </button>
        )}
      </div>
      <div>Escribe un nuevo post...</div>
      <button>Publicar</button>
      <PopupEmocion user={user} setUser={setUser} reference={popup} />
    </div>
  );
};

export default RedSocial;
