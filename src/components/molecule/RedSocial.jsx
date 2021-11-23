import React, { useEffect, useRef, useState } from "react";
import PopupEmocion from "../atom/PopupEmocion";
import swal from "sweetalert";
import Post from "../atom/Post";
import UseSearch from "../../hooks/UseSearch";
import { postLike, putPost } from "../../services/Posts";

const RedSocial = ({
  user,
  setUser,
  busqueda,
  setBusqueda,
  newpost,
  setNewPost,
  posts,
  setPosts,
  cargarPosts,
}) => {
  const [showStop, setShowStop] = useState(false);
  const [rec, setRec] = useState(null);
  const [comentario, setComentario] = useState("");
  const popup = useRef();
  const newPost = useRef();
  const { filteredResults } = UseSearch(posts, "contenido", busqueda);

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
        }
      });
      rec.start();
    }
  };

  const stopMicrophone = () => {
    rec.stop();
  };

  const toggleButtonPost = (e) => {
    if (e.target.children[0].classList.contains("fa-plus")) {
      document.getElementById("cuerpo").classList.add("posts-tamanio");
      e.target.children[0].classList.remove("fa-plus");
      e.target.children[0].classList.add("fa-minus");
      newPost.current.classList.add("div-active");
      newPost.current.classList.remove("hidden-post");
      document.getElementById("cabecera").classList.remove("post-tamanio");
    } else {
      document.getElementById("cuerpo").classList.remove("posts-tamanio");
      e.target.children[0].classList.add("fa-plus");
      e.target.children[0].classList.remove("fa-minus");
      newPost.current.classList.remove("div-active");
      document.getElementById("cabecera").classList.add("post-tamanio");
      setTimeout(() => newPost.current.classList.add("hidden-post"), 200);
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

  const toggleComentarios = (id) => {
    document.getElementById(id).classList.toggle("comentarios-show");
  };

  const like = (like_id, post_id, like) => {
    const json = {
      like: {
        usuario: { id: user.id },
        post: { id: post_id },
        estado: !like,
      },
      login: { correo: user.correo, contrasenia: user.contrasenia },
    };

    if (like_id !== undefined) {
      json.like.id = like_id;
    }

    postLike(JSON.stringify(json)).then((resp) => {
      cargarPosts();
    });
  };

  const eliminaPost = (post) => {
    swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este post",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const json = {
          post: {
            id: post.id,
            usuario: { id: user.id },
            fecha: post.fecha,
            descripcion: post.contenido,
            estado: false,
          },
          login: { correo: user.correo, contrasenia: user.contrasenia },
        };
        putPost(JSON.stringify(json))
          .then((resp) => {
            cargarPosts();
            swal("Eliminado!", "Tu post se eliminó", "success");
          })
          .catch((err) => {
            swal("Opps!", "No se pudo eliminar", "error");
          });

        // const json = {
        //   post: {
        //     id: post.id,
        //     usuario: { id: user.id },
        //   },
        //   login: { correo: user.correo, contrasenia: user.contrasenia },
        // };
        // postEliminaPost(JSON.stringify(json))
        //   .then((resp) => {
        //     cargarPosts();
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      }
    });
  };

  const addComentario = (e) => {
    if (comentario !== null && comentario !== "") {
      console.log(e);
    } else {
      swal("Opps!", "No puedes dejar el comentarios vacio", "error");
    }
  };

  return (
    <div className="red-social">
      <div className="cabecera post-tamanio" id="cabecera">
        <div className="ultimas-emociones">
          <ul className="ul">
            {user.semanaEmociones.map((emocion, key) => (
              <li
                key={key}
                className={key === 6 ? "active on li" : "no-today li"}
                onClick={() => (key === 6 ? eligeEmocion() : "")}
              >
                <img src={urlEmocion(emocion)} alt="emocion" />
              </li>
            ))}
            <PopupEmocion user={user} setUser={setUser} reference={popup} />
          </ul>
        </div>
        <div className="search">
          <div className="content__search">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Buscar..."
              onChange={(e) => setBusqueda(e.target.value)}
              value={busqueda}
            />
            {showStop ? (
              <button onClick={() => stopMicrophone()}>
                <i className="fas fa-square"></i>
              </button>
            ) : (
              <button onClick={() => handleMicrophone()}>
                <i className="fas fa-microphone"></i>
              </button>
            )}
          </div>
          <button className="new-post" onClick={(e) => toggleButtonPost(e)}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <Post
          reference={newPost}
          user={user}
          newpost={newpost}
          setNewPost={setNewPost}
          posts={posts}
          setPosts={setPosts}
          cargarPosts={cargarPosts}
        />
      </div>
      <div className="cuerpo" id="cuerpo">
        {filteredResults &&
          filteredResults.map((post, key) => (
            <div className="post" key={key}>
              <div className="cabecera-post">
                <h3 className="title">{post.title}</h3>
                {post.edit && (
                  <button className="delete" onClick={() => eliminaPost(post)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                )}
              </div>
              <p className="contenido">{post.contenido}</p>
              <div className="botones">
                <button
                  className="like"
                  onClick={() => like(post.like_id, post.id, post.like)}
                >
                  {post.like ? (
                    <i className="fas fa-heart"></i>
                  ) : (
                    <i className="far fa-heart"></i>
                  )}{" "}
                  {post.likes}
                </button>
                <button onClick={() => toggleComentarios(`comentario-${key}`)}>
                  <i className="fas fa-comments"></i>{" "}
                  {post.comentarios.length || 0} comentarios
                </button>
              </div>

              <div className="comentarios" id={`comentario-${key}`}>
                {post.comentarios &&
                  post.comentarios.length > 0 &&
                  post.comentarios.map((comentario, i) => (
                    <div className="comentario" key={i}>
                      <h3 className="title-c">{`${
                        comentario?.usuario?.nombre
                      } ${
                        comentario?.usuario?.apellidoPa
                      } / ${comentario?.fecha?.slice(0, 10)}`}</h3>
                      <p className="contenido-c">{comentario?.descripcion}</p>
                    </div>
                  ))}
                <div className="new-comentario">
                  <textarea
                    name="comentario"
                    onChange={(e) => setComentario(e.target.value)}
                  ></textarea>
                  <button
                    className="plus-comentario"
                    onClick={() => addComentario(post.id)}
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RedSocial;
