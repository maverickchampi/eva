import React, { useState } from "react";
import MenuLateral from "../components/atom/MenuLateral";
import MiniPerfil from "../components/atom/MiniPerfil";
import Chat from "../components/atom/Chat";
import InicioDashboard from "../components/organism/InicioDashboard";

const Dashboard = () => {
  const [user, setUser] = useState({
    name: "Juan",
    lastname: "de la Torres",
    posts: 5,
    aportes: 2,
    foto: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    calendarioAnimos: [0, 1, 3, 2, 2, 3],
    semanaEmociones: [2, 5, 2, 1, 3, 4, 0],
  });
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "María Julieta - 18/11/2021",
      contenido:
        "Ayer me robaron mi celular y me siento mal, ¿recomendaciones?",
      likes: 10,
      comentarios: [
        {
          id: 1,
          title: "Juan - 18/11/2021",
          contenido: "Ayer me robaron mi celular igual f",
        },
        {
          id: 2,
          title: "Juana - 18/11/2021",
          contenido: "pobre uu",
        },
      ],
    },
    {
      id: 2,
      title: "María Julieta - 18/11/2021",
      contenido:
        "Sufro de ansiedad y me da ataques de pánicos, que puedo hacer ayudaaaa",
      likes: 2,
    },
    {
      id: 3,
      title: "María Julieta - 18/11/2021",
      contenido:
        "Ayer aprobé un curso super dificil, estuve algo ansioso pero estoy feliz",
      likes: 5,
    },
    {
      id: 4,
      title: "María Julieta - 18/11/2021",
      contenido:
        "Estoy por cumplir un año con mi novia, que emoción, estoy muy nervioso",
      likes: 14,
    },
    {
      id: 5,
      title: "María Julieta - 18/11/2021",
      contenido:
        "Mi perrito murió, me siento devastado, me deprimo, ando sin ganas, nose que hacer",
      likes: 1,
    },
  ]);
  const [recompensas, setRecompensas] = useState([
    {
      id: 1,
      class: "rappi",
      title: "Come rico en Rappi",
      description:
        "Completa el regisro de tus emociones por 7 días y gana un cupón del 25%.",
      status: false,
      descriptionStatus: "0/7",
    },
    {
      id: 2,
      class: "manzana",
      title: "Disfruta saludablemente",
      description:
        "Publica 10 posts y gana un descuento del 10% en Manzana Verde",
      status: true,
      descriptionStatus: "10/10",
    },
    {
      id: 3,
      class: "felipe",
      title: "Consultas en Clínica San Felipe",
      description:
        "Registra tu estado de ánimo por un mes y gana 50% de descuento en consultas",
      status: false,
      descriptionStatus: "10/30",
    },
    {
      id: 4,
      class: "pichincha",
      title: "Pensando en ti",
      description:
        "Descuento del 2% en tasa de cambio a dólares con Pichincha al hacer 25 aportes",
      status: false,
      descriptionStatus: "2/25",
    },
  ]);
  const [busqueda, setBusqueda] = useState("");
  const [newpost, setNewPost] = useState({});

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
            />
            <MiniPerfil user={user} />
          </div>
        </div>
      </div>
      <Chat />
    </>
  );
};

export default Dashboard;
