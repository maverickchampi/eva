import React, { useState, useEffect } from "react";
import MenuLateral from "../components/atom/MenuLateral";
import MiniPerfil from "../components/atom/MiniPerfil";
import ActualizarPerfil from "../components/molecule/ActualizarPerfil";
import DetallePerfil from "../components/molecule/DetallePerfil";
import ModalObjetivo from "../components/molecule/ModalObjetivo";
import Modal from "../components/organism/Modal";
import { user as usuario } from "../constants/methods";
import { getAnimo } from "../services/Animo";
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
  const [objetivo, setObjetivo] = useState({
    id: 1,
    titulo: 'Personal',
    descripcion: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. ',
    fecha_inicio: "2022-01-11",
    fecha_fin: "2022-02-11",
    nivel_esfuerzo: 2,
  });
  const [fechaHoy, setFechaHoy] = useState({
    id: null,
    valor: 0,
    usuario: { id: user.id },
    texto: "",
    fecha: null,
  });
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
  
  const cargarEmociones = () => {
    const json = {
      correo: usuario().correo,
      contrasenia: usuario().contrasenia,
    };
    getEmocion(JSON.stringify(json)).then((response) => {
      response.emociones.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
      response.emociones.reverse();
      setEmociones(response.emociones);
    });
  };

  useEffect(() => {
    cargarEmociones();
  }, []);

  useEffect(() => {
    const data = [
      {
        id: 1,
        titulo: 'Personal',
        descripcion: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. ',
        fecha_inicio: "2022-01-11",
        fecha_fin: "2022-02-11",
        nivel_esfuerzo: 2,
      },
      {
        id: 1,
        titulo: 'Personal',
        descripcion: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. ',
        fecha_inicio: "2022-01-11",
        fecha_fin: "2022-02-11",
        nivel_esfuerzo: 1,
      },
      {
        id: 1,
        titulo: 'Personal',
        descripcion: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. ',
        fecha_inicio: "2022-01-11",
        fecha_fin: "2022-02-11",
        nivel_esfuerzo: 2,
      },
      {
        id: 1,
        titulo: 'Personal',
        descripcion: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. ',
        fecha_inicio: "2022-01-11",
        fecha_fin: "2022-02-11",
        nivel_esfuerzo: 0,
      },
      {
        id: 1,
        titulo: 'Personal',
        descripcion: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. ',
        fecha_inicio: "2022-01-11",
        fecha_fin: "2022-02-11",
        nivel_esfuerzo: 1,
      }
    ]
    setObjetivos(data)
  }, []);

  const fechaHoyString = () => {
    let fecha = new Date();
    let dia = fecha.getDate() < 10 ? "0" + fecha.getDate() : fecha.getDate();
    let mes =
      fecha.getMonth() + 1 < 10
        ? "0" + (fecha.getMonth() + 1)
        : fecha.getMonth() + 1;
    let anio = fecha.getFullYear();
    return anio + "-" + mes + "-" + dia;
  };

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
