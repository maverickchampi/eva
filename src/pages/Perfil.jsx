import React, { useState, useEffect } from "react";
import MenuLateral from "../components/atom/MenuLateral";
import MiniPerfil from "../components/atom/MiniPerfil";
import ActualizarPerfil from "../components/molecule/ActualizarPerfil";
import DetallePerfil from "../components/molecule/DetallePerfil";
import ModalObjetivo from "../components/molecule/ModalObjetivo";
import Modal from "../components/organism/Modal";
import { user as usuario } from "../constants/methods";
import { getObjetivos } from "../services/Objetivo";
import { getPosts } from '../services/Posts'
import { getEmocion } from "../services/Emocion";

const Perfil = () => {
  const [user, setUser] = useState({
    ...usuario(),
    foto: usuario()?.foto || "https://i.ibb.co/JBcGfKj/imagen.png",
  });
  const [emociones, setEmociones] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [ModalContent, setModalContent] = useState();
  const [edit, setEdit] = useState(true);
  const [objetivos, setObjetivos] = useState([]);

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
  
  const cargarObjetivos = () => {
    const json = {
      correo: usuario().correo,
      contrasenia: usuario().contrasenia,
    };
    getObjetivos(JSON.stringify(json)).then((response) => {
      const objs = response.objetivos.filter((obj) => obj.estado === true);
      setObjetivos(objs)
    });
  }

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
    cargarPosts()
    cargarEmociones()
    cargarObjetivos()
  }, []);

  const mouseDownModal = (e) =>{
    const divPadre = e.target.closest('.modal-content');
    if(!divPadre) setOpenModal(false)
  }

  const modalAgregarObjetivo = () =>{
    setOpenModal(true)
    setModalContent(
      <ModalObjetivo 
        titulo={'Agregar objetivo'} 
        isAdd={true} 
        setOpenModal={setOpenModal}
        cargarObjetivos={cargarObjetivos}
        user={user}
      />
    )
  }

  const modalEditarObjetivo =(objetivo) =>{
    setOpenModal(true)
    setModalContent(
      <ModalObjetivo
        titulo={'Detalle de objetivo'} 
        isEdit={true} 
        isDelete={true} 
        setOpenModal={setOpenModal}
        objetivo={objetivo}
        cargarObjetivos={cargarObjetivos}
        user={user}
      />
    )
  }

  return (
    <>
      <Modal isOpen={openModal} onMouseDown= {mouseDownModal} children={ModalContent}/>        
      <div className="dashboard dashboard-perfil">
        <div className="container">
          <MenuLateral link={1} />
          <div className="content content-perfil">
            <div className="perfil__item">
              <DetallePerfil
                user={user}
                setUser={setUser}
                objetivos={objetivos}
                recompensas={recompensas}
                openAgregarObjetivo= {modalAgregarObjetivo}
                openEditarObjetivo= {modalEditarObjetivo}
              />
              <ActualizarPerfil
                edit={edit}
                setEdit={setEdit}
                user={user}
                setUser={setUser}
              />
            </div>
            <MiniPerfil
              user={user}
              buttonsEdit={true}
              edit={edit}
              setEdit={setEdit}
              emociones={emociones}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Perfil;
