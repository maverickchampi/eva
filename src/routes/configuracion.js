import React from "react";
import Baul from "../pages/Baul";
import Dashboard from "../pages/Dashboard";
import Inicio from "../pages/Inicio";
import Login from "../pages/Login";
import Perfil from "../pages/Perfil";
import Plus from "../pages/Plus";
import Registro from "../pages/Registro";

export const routes = [
  {
    path: "/",
    exact: true,
    render: () => <Inicio />,
  },
  {
    path: "/login",
    exact: true,
    render: () => <Login />,
  },
  {
    path: "/registro",
    exact: true,
    render: () => <Registro />,
  },
  {
    path: "/dashboard",
    exact: true,
    render: () => <Dashboard />,
  },
  {
    path: "/perfil",
    exact: true,
    render: () => <Perfil />,
  },
  {
    path: "/plus",
    exact: true,
    render: () => <Plus />,
  },
  {
    path: "/box",
    exact: true,
    render: () => <Baul />,
  },
  { path: "", exact: false, render: () => <Inicio /> },
];
