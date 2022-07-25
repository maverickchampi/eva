import React, { useState, useEffect } from "react";
import MenuLateral from "../components/atom/MenuLateral";
import MiniPerfil from "../components/atom/MiniPerfil";
import Chat from "../components/atom/Chat";
import InicioDashboard from "../components/organism/InicioDashboard";
import { user as usuario } from "../constants/methods";
import { getPosts } from "../services/Posts";
import { getEmocion } from "../services/Emocion";
import { getAnimo } from "../services/Animo";

const Dashboard = () => {
  const [user, setUser] = useState({
    ...usuario(),
    foto: usuario()?.foto || "https://i.ibb.co/JBcGfKj/imagen.png",
    posts: 0,
    likes: 0,
    // calendarioAnimos: [0, 1, 3, 2, 2, 3],
    // semanaEmociones: [2, 5, 2, 1, 3, 4, 0],
  });
  const [emociones, setEmociones] = useState([]);
  const [posts, setPosts] = useState([]);
  const [recompensas, setRecompensas] = useState([
    {
      id: 1,
      class: "rappi",
      title: "Come rico en Rappi",
      description:
        "Completa el regisro de tus emociones por 7 días y gana un cupón del 25%.",
      valor_entregado: 0,
      valor_total: 7,
    },
    {
      id: 2,
      class: "manzana",
      title: "Disfruta saludablemente",
      description:
        "Publica 10 posts y gana un descuento del 10% en Manzana Verde",

      valor_entregado: 10,
      valor_total: 10,
    },
    {
      id: 3,
      class: "felipe",
      title: "Consultas en Clínica San Felipe",
      description:
        "Da 100 likes y gana 50% de descuento en consultas en la clínica",
      valor_entregado: 0,
      valor_total: 100,
    },
    {
      id: 4,
      class: "pichincha",
      title: "Pensando en ti",
      description:
        "Descuento del 2% en tasa de cambio a dólares con Pichincha al hacer 25 aportes",
      valor_entregado: 0,
      valor_total: 25,
    },
  ]);
  const [busqueda, setBusqueda] = useState("");
  const [newpost, setNewPost] = useState({});


  const cargarPosts = () => {
    getPosts().then((response) => {
      let _posts = [];
      let _mylikes = 0;
      let _myposts = 0;
      let _mycomments = 0;

      const contarLikes = (likes, id) => {
        if (likes !== undefined) {
          if (likes.length > 0) {
            const __posts = likes.filter(
              (p) => Number(p.post.id) === Number(id) && p.estado === true
            );
            return __posts.length;
          } else {
            return 0;
          }
        } else {
          return 0;
        }
      };

      const verificaLike = (likes, id) => {
        if (likes !== undefined) {
          if (likes.length > 0) {
            const __posts = likes.filter(
              (p) =>
                Number(p.post.id) === Number(id) &&
                Number(p.usuario.id) === Number(usuario().id) &&
                p.estado === true
            );
            const resp = __posts.length > 0 ? true : false;
            if (resp === true) _mylikes += 1;
            return resp;
          } else {
            return false;
          }
        } else {
          return false;
        }
      };

      const likeId = (likes, id) => {
        if (likes !== undefined) {
          if (likes.length > 0) {
            const __posts = likes.filter(
              (p) =>
                Number(p.post.id) === Number(id) &&
                Number(p.usuario.id) === Number(usuario().id)
            );
            return __posts[0]?.id;
          } else {
            return -1;
          }
        } else {
          return -1;
        }
      };

      const editar = (id) => {
        if (usuario() !== null) {
          if (id === usuario().id) {
            _myposts += 1;
            return true;
          } else {
            return false;
          }
        }
      };

      const filtraComentarios = (comentarios, idpost) => {
        // console.log(comentarios);
        if (comentarios !== undefined) {
          if (comentarios.length > 0) {
            const __comentarios = comentarios.filter(
              (c) => c.estado === true && c.post.id === idpost
            );
            __comentarios.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

            __comentarios.map(
              (c) => (c.edit = c.usuario.id === usuario().id ? true : false)
            );
            __comentarios.map((c) =>
              c.usuario.id === usuario().id ? (_mycomments += 1) : false
            );

            return __comentarios;
          } else {
            return 0;
          }
        } else {
          return 0;
        }
      };

      response.posts.map(
        (r) =>
          r.estado === true &&
          _posts.push({
            id: r.id,
            title: `${r.usuario.nombre} ${r.usuario.apellidoPa}`,
            fecha: r.fecha,
            edit: editar(r.usuario.id),
            contenido: r.descripcion,
            likes: contarLikes(response.likes, r.id),
            like: verificaLike(response.likes, r.id),
            like_id: likeId(response.likes, r.id),
            comentarios: filtraComentarios(response.comentarios, r.id),
            foto: r.usuario.foto,
          })
      );
      _posts.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
      _posts.reverse();
      setPosts(_posts);
      // console.log(_mylikes);
      // console.log(_myposts);
      // console.log(posts);
      let rec = [...recompensas];
      rec[1].valor_entregado = _myposts;
      rec[2].valor_entregado = _mylikes;
      rec[3].valor_entregado = _mycomments;
      setRecompensas(rec);
      setUser({ ...user, likes: _mylikes, posts: _myposts });
    });
  };

  const cargarEmociones = () => {
    const json = {
      correo: usuario().correo,
      contrasenia: usuario().contrasenia,
    };
    getEmocion(JSON.stringify(json)).then((response) => {
      response.emociones.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
      response.emociones.reverse();
      setEmociones(response.emociones);
      let rec = [...recompensas];
      rec[0].valor_entregado = response.emociones.length;
      setRecompensas(rec);
    });
  };

  useEffect(() => {
    cargarPosts();
    cargarEmociones();
  }, []);

  return (
    <>
      <div className="dashboard">
        <div className="container">
          <MenuLateral />
          <div className="content dashboard-home">
            <InicioDashboard
              user={user}
              setUser={setUser}
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              newpost={newpost}
              setNewPost={setNewPost}
              posts={posts}
              setPosts={setPosts}
              recompensas={recompensas}
              cargarPosts={cargarPosts}
              emociones={emociones}
              setEmociones={setEmociones}
              cargarEmociones={cargarEmociones}
            />
            <MiniPerfil user={user} emociones={[]} />
          </div>
        </div>
      </div>
      <Chat />
    </>
  );
};

export default Dashboard;
