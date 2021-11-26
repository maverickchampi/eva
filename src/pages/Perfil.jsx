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
  const [animos, setAnimos] = useState([0, 0, 0, 0, 0, 0]);
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

  const cargarAnimos = () => {
    const js = {
      correo: user.correo,
      contrasenia: user.contrasenia,
    };
    getAnimo(JSON.stringify(js))
      .then((resp) => {
        let cantidad = [
          { valor: 0, cantidad: 0 },
          { valor: 0, cantidad: 0 },
          { valor: 0, cantidad: 0 },
          { valor: 0, cantidad: 0 },
          { valor: 0, cantidad: 0 },
          { valor: 0, cantidad: 0 },
        ];
        const animos = resp.animos;

        if (animos) {
          animos.forEach((animo) => {
            if (animo.fecha === fechaHoyString()) {
              setFechaHoy(animo);
            }

            switch (new Date(animo.fecha).getMonth()) {
              case 6:
                cantidad[0].valor += animo.valor;
                cantidad[0].cantidad += 1;
                break;
              case 7:
                cantidad[1].valor += animo.valor;
                cantidad[1].cantidad += 1;
                break;
              case 8:
                cantidad[2].valor += animo.valor;
                cantidad[2].cantidad += 1;
                break;
              case 9:
                cantidad[3].valor += animo.valor;
                cantidad[3].cantidad += 1;
                break;
              case 10:
                cantidad[4].valor += animo.valor;
                cantidad[4].cantidad += 1;
                break;
              case 11:
                cantidad[5].valor += animo.valor;
                cantidad[5].cantidad += 1;
                break;
            }
          });
        }

        setAnimos([
          cantidad[0].cantidad > 0
            ? Number((cantidad[0].valor / cantidad[0].cantidad).toFixed(0))
            : 0,
          cantidad[1].cantidad > 0
            ? Number((cantidad[1].valor / cantidad[1].cantidad).toFixed(0))
            : 0,
          cantidad[2].cantidad > 0
            ? Number((cantidad[2].valor / cantidad[2].cantidad).toFixed(0))
            : 0,
          cantidad[3].cantidad > 0
            ? Number((cantidad[3].valor / cantidad[3].cantidad).toFixed(0))
            : 0,
          cantidad[4].cantidad > 0
            ? Number((cantidad[4].valor / cantidad[4].cantidad).toFixed(0))
            : 0,
          cantidad[5].cantidad > 0
            ? Number((cantidad[5].valor / cantidad[5].cantidad).toFixed(0))
            : 0,
        ]);
      })
      .catch((err) => console.log(err));
  };

  // console.log(fechaHoy);

  useEffect(() => {
    cargarAnimos();
  }, []);

  return (
    <div className="dashboard dashboard-perfil">
      <div className="container">
        <MenuLateral link={1} />
        <div className="content content-perfil">
          <div className="perfil__item">
            <DetallePerfil
              user={user}
              setUser={setUser}
              animos={animos}
              cargarAnimos={cargarAnimos}
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
            animos={animos}
          />
        </div>
      </div>
    </div>
  );
};

export default Perfil;
