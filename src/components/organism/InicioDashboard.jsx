import React from "react";
import DetalleDashboard from "../molecule/DetalleDashboard";
import RedSocial from "../molecule/RedSocial";

const InicioDashboard = ({
  user,
  setUser,
  busqueda,
  setBusqueda,
  newpost,
  setNewPost,
  posts,
  setPosts,
  recompensas,
  cargarPosts,
  emociones,
  setEmociones,
  cargarEmociones,
  promedio_emociones
}) => {
  return (
    <div className="inicio-dashboard">
      <DetalleDashboard recompensas={recompensas} emociones={emociones} />
      <RedSocial
        user={user}
        setUser={setUser}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        newpost={newpost}
        setNewPost={setNewPost}
        posts={posts}
        setPosts={setPosts}
        cargarPosts={cargarPosts}
        emociones={emociones}
        cargarEmociones={cargarEmociones}
      />
    </div>
  );
};

export default InicioDashboard;
