import React, { useState, useEffect } from "react";
import MenuLateral from "../components/atom/MenuLateral";
import MiniPerfil from "../components/atom/MiniPerfil";
import ActualizarPerfil from "../components/molecule/ActualizarPerfil";
import DetallePerfil from "../components/molecule/DetallePerfil";
import { user as usuario } from "../constants/methods";

const Perfil = () => {
  const [user, setUser] = useState({
    ...usuario(),
    foto: usuario()?.foto || "https://i.ibb.co/JBcGfKj/imagen.png",
  });
  const [edit, setEdit] = useState(true);

  return (
    <div className="dashboard dashboard-perfil">
      <div className="container">
        <MenuLateral link={1} />
        <div className="content content-perfil">
          <div className="perfil__item">
            <DetallePerfil />
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
          />
        </div>
      </div>
    </div>
  );
};

export default Perfil;
