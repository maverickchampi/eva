import React from "react";
import DetalleDashboard from "../molecule/DetalleDashboard";
import RedSocial from "../molecule/RedSocial";

const InicioDashboard = ({ user, setUser, busqueda, setBusqueda }) => {
  return (
    <div className="inicio-dashboard">
      <DetalleDashboard />
      <RedSocial
        user={user}
        setUser={setUser}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />
    </div>
  );
};

export default InicioDashboard;
