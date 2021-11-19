import React, { useEffect, useState } from "react";
import swal from "sweetalert";

const Post = ({ reference, newpost, setNewPost, user }) => {
  const [showStop, setShowStop] = useState(false);
  const [rec, setRec] = useState(null);

  const handleMicrophone = () => {
    if (!("webkitSpeechRecognition" in window)) {
      swal("Opps!", "API no soportada", "error");
    } else {
      rec.lang = "es-PE";
      rec.continue = true;
      rec.interim = true;
      rec.addEventListener("result", (e) => {
        for (let i = e.resultIndex; i < e.results.length; i++) {
          setNewPost(e.results[i][0].transcript);
        }
      });
      rec.start();
    }
  };

  const stopMicrophone = () => {
    rec.stop();
  };

  const publicarPost = (e) => {
    e.preventDefault();
    console.log("Publicado...");
    swal("Publicado!", "Tu post se publico", "success");
    setNewPost("");
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

  return (
    <div className="post" ref={reference}>
      <form onSubmit={(e) => publicarPost(e)}>
        <textarea
          id="contentpost"
          placeholder="Escribe un nuevo post..."
          value={newpost}
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>
        <div className="botones">
          <div class="audio">
            {showStop ? (
              <button type="button" onClick={() => stopMicrophone()}>
                <i class="fas fa-square"></i>
              </button>
            ) : (
              <button type="button" onClick={() => handleMicrophone()}>
                <i class="fas fa-microphone"></i>
              </button>
            )}
            <button type="button">
              <i class="fas fa-volume-down"></i>
            </button>
          </div>
          <button className="submit">Publicar</button>
        </div>
      </form>
    </div>
  );
};

export default Post;
