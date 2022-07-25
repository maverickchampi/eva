import React, { useState, useEffect } from "react";
import MenuLateral from "../components/atom/MenuLateral";
import MiniPerfil from "../components/atom/MiniPerfil";
import ActualizarPerfil from "../components/molecule/ActualizarPerfil";
import DetallePerfil from "../components/molecule/DetallePerfil";
import { user as usuario } from "../constants/methods";
import { getAnimo } from "../services/Animo";

const Perfil = () => {
  const [user, setUser] = useState({
    ...usuario(),
    foto: usuario()?.foto || "https://i.ibb.co/JBcGfKj/imagen.png",
  });
  const [edit, setEdit] = useState(true);
  const [fechaHoy, setFechaHoy] = useState({
    id: null,
    valor: 0,
    usuario: { id: user.id },
    texto: "",
    fecha: null,
  });

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


  return (
    <div className="dashboard dashboard-perfil">
      <div className="container">
        <MenuLateral link={1} />
        <div className="content content-perfil">
          <div className="perfil__item">
            <DetallePerfil
              user={user}
              setUser={setUser}
              fechaHoy={fechaHoy}
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
  );
};

export default Perfil;
