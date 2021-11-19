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
  const [busqueda, setBusqueda] = useState("");
  const [newpost, setNewPost] = useState("");

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
