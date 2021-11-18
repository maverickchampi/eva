import React from "react";
import Dashboard from "../pages/Dashboard";
import Inicio from "../pages/Inicio";
import Login from "../pages/Login";
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
  { path: "", exact: false, render: () => <Inicio /> },
];
