import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { postPost } from "../../services/Posts";

const Post = ({
  reference,
  newpost,
  setNewPost,
  user,
  posts,
  setPosts,
  cargarPosts,
}) => {
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
          setNewPost({ ...newpost, contenido: e.results[i][0].transcript });
        }
      });
      rec.start();
    }
  };

  const stopMicrophone = () => {
    rec.stop();
  };

  const handleVoice = () => {
    speechSynthesis.speak(new SpeechSynthesisUtterance(newpost.contenido));
  };

  const publicarPost = (e) => {
    e.preventDefault();
    const post = {
      contenido: newpost.contenido || "",
    };
    if (post.contenido !== null && post.contenido !== "") {
      const json = {
        post: {
          usuario: { id: user.id },
          descripcion: post.contenido,
          estado: true,
        },
        login: { correo: user.correo, contrasenia: user.contrasenia },
      };
      postPost(JSON.stringify(json))
        .then((resp) => {
          swal("Publicado!", "Tu post se publico", "success");
          cargarPosts();
          setNewPost("");
        })
        .catch((err) => {
          swal("Opps!", "No se pudo publicar", "error");
        });
    } else {
      swal("Opps!", "No puedes dejar el post vacio", "error");
    }
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
    <div className="post hidden-post" ref={reference}>
      <form onSubmit={(e) => publicarPost(e)}>
        <textarea
          id="contentpost"
          placeholder="Escribe un nuevo post..."
          value={newpost.contenido || ""}
          onChange={(e) =>
            setNewPost({ ...newpost, contenido: e.target.value })
          }
        ></textarea>
        <div className="botones">
          <div className="audio">
            {showStop ? (
              <button type="button" onClick={() => stopMicrophone()}>
                <i className="fas fa-square"></i>
              </button>
            ) : (
              <button type="button" onClick={() => handleMicrophone()}>
                <i className="fas fa-microphone"></i>
              </button>
            )}
            <button type="button" onClick={() => handleVoice()}>
              <i className="fas fa-volume-down"></i>
            </button>
          </div>
          <button className="submit">Publicar</button>
        </div>
      </form>
    </div>
  );
};

export default Post;
