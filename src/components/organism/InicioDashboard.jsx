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
}) => {
  return (
    <div className="inicio-dashboard">
      <DetalleDashboard recompensas={recompensas} />
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
      />
    </div>
  );
};

export default InicioDashboard;
