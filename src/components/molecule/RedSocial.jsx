import React, { useEffect, useRef, useState } from "react";
import PopupEmocion from "../atom/PopupEmocion";
import swal from "sweetalert";
import Post from "../atom/Post";
import UseSearch from "../../hooks/UseSearch";
import {
  postComentario,
  postLike,
  putComentario,
  putPost,
} from "../../services/Posts";

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
  emociones,
  cargarEmociones,
}) => {
  const [showStop, setShowStop] = useState(false);
  const [emocionesUltimas, setEmocionesUltimas] = useState([]);
  const [emocionUltima, setEmocionUltima] = useState({});
  const [rec, setRec] = useState(null);
  const [comentario, setComentario] = useState("");
  const popup = useRef();
  const newPost = useRef();
  const { filteredResults } = UseSearch(posts, busqueda, "contenido", "title");

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

  const returnEmocion = (emocion) => {
    switch (emocion) {
      case 1:
          return "😊";
        case 2:
          return "🥺";
        case 3:
          return "😧";
        case 4:
          return "😡";
        case 5:
          return "😒";
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
      }
    });
  };

  const addComentario = (idpost) => {
    if (comentario !== null && comentario !== "") {
      const json = {
        comentario: {
          usuario: { id: user.id },
          post: { id: idpost },
          descripcion: comentario,
          estado: true,
        },
        login: { correo: user.correo, contrasenia: user.contrasenia },
      };
      postComentario(JSON.stringify(json))
        .then((resp) => {
          swal("Publicado!", "Tu comentario se publico", "success");
          cargarPosts();
          setComentario("");
        })
        .catch((err) => {
          swal("Opps!", "No se pudo comentar", "error");
        });
    } else {
      swal("Opps!", "No puedes dejar el comentarios vacio", "error");
    }
  };

  const eliminaComentario = (com) => {
    swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este comentario",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const json = {
          comentario: {
            id: com.id,
            usuario: { id: user.id },
            post: { id: com.post.id },
            fecha: com.fecha,
            descripcion: com.descripcion,
            estado: false,
          },
          login: { correo: user.correo, contrasenia: user.contrasenia },
        };
        putComentario(JSON.stringify(json))
          .then((resp) => {
            cargarPosts();
            swal("Eliminado!", "Tu comentario se eliminó", "success");
          })
          .catch((err) => {
            swal("Opps!", "No se pudo eliminar", "error");
          });
      }
    });
  };

  const fechaHoy = () => {
    let fecha = new Date();
    let dia = fecha.getDate() < 10 ? "0" + fecha.getDate() : fecha.getDate();
    let mes =
      fecha.getMonth() + 1 < 10
        ? "0" + (fecha.getMonth() + 1)
        : fecha.getMonth() + 1;
    let anio = fecha.getFullYear();
    return anio + "-" + mes + "-" + dia;
  };

  useEffect(() => {
    if (emociones.length !== null) {
      let _emociones = [
        { valor: 0 },
        { valor: 0 },
        { valor: 0 },
        { valor: 0 },
        { valor: 0 },
        { valor: 0 },
        { valor: 0 },
      ];
      if (emociones.length > 7) {
        _emociones = emociones.slice(0, 7);
      } else {
        for (let i = 0; i < emociones.length; i++) {
          _emociones[i] = emociones[i];
        }
      }

      if (_emociones[0]?.fecha === fechaHoy()) {
        // console.log("fecha hoy");
        setEmocionUltima(_emociones[0]);
      } else {
        // console.log("fecha no hoy");
        // console.log(_emociones);
        _emociones.unshift({ valor: 0 });
        _emociones = _emociones.slice(0, 7);
      }

      // console.log(_emociones);

      _emociones.reverse();
      setEmocionesUltimas(_emociones);
    }
  }, [emociones]);

  return (
    <div className="red-social">
      <div className="cabecera post-tamanio" id="cabecera">
        <div className="ultimas-emociones">
          <ul className="ul">
            {emocionesUltimas.map((emocion, key) => (
              <li
                key={key}
                className={key === 6 ? "active on li" : "no-today li"}
                onClick={() => (key === 6 ? eligeEmocion() : "")}
              >
                <span>{returnEmocion(emocion.valor)}</span>
              </li>
            ))}
            <PopupEmocion
              user={user}
              setUser={setUser}
              reference={popup}
              emocionUltima={emocionUltima}
              emocionesUltimas={emocionesUltimas}
              setEmocionesUltimas={setEmocionesUltimas}
              setEmocionUltima={setEmocionUltima}
              cargarEmociones={cargarEmociones}
            />
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
          <button className="new-post" onClick={() => cargarPosts()}>
            <i className="fas fa-undo-alt"></i>
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
                <div className="header">
                  <img
                    src={post.foto || "https://i.ibb.co/JBcGfKj/imagen.png"}
                    alt="usuario de post"
                  />
                  <div className="header-content">
                    <h3 className="title">{post.title}</h3>
                    <h4 className="title">{post?.fecha?.slice(0, 16)}</h4>
                  </div>
                </div>
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
                      <div className="cabecera-post">
                        <div className="header header-comentario">
                          <img
                            src={
                              comentario?.usuario?.foto ||
                              "https://i.ibb.co/JBcGfKj/imagen.png"
                            }
                            alt="usuario de post"
                          />
                          <div className="header-content">
                            <h3 className="title-c">{`${comentario?.usuario?.nombre} ${comentario?.usuario?.apellidoPa}`}</h3>
                            <h4 className="title">
                              {comentario?.fecha?.slice(0, 16)}
                            </h4>
                          </div>
                        </div>
                        {comentario?.edit && (
                          <button
                            className="delete"
                            onClick={() => eliminaComentario(comentario)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        )}
                      </div>
                      <p className="contenido-c">{comentario?.descripcion}</p>
                    </div>
                  ))}
                <div className="new-comentario">
                  <textarea
                    name="comentario"
                    onChange={(e) => setComentario(e.target.value)}
                    value={comentario}
                  ></textarea>
                  <button
                    className="plus-comentario"
                    onClick={() => addComentario(post.id)}
                  >
                    <i className="fas fa-plus"></i>
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
