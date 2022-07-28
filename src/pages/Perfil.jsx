import React, { useState, useEffect } from "react";
import MenuLateral from "../components/atom/MenuLateral";
import MiniPerfil from "../components/atom/MiniPerfil";
import ActualizarPerfil from "../components/molecule/ActualizarPerfil";
import DetallePerfil from "../components/molecule/DetallePerfil";
import ModalObjetivo from "../components/molecule/ModalObjetivo";
import Modal from "../components/organism/Modal";
import { user as usuario } from "../constants/methods";
import { getObjetivos } from "../services/Objetivo";

const Perfil = () => {
  const [user, setUser] = useState({
    ...usuario(),
    foto: usuario()?.foto || "https://i.ibb.co/JBcGfKj/imagen.png",
  });
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
  };

  useEffect(() => {
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
              emociones={[]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Perfil;
