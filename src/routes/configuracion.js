import React from "react";
import Baul from "../pages/Baul";
import Dashboard from "../pages/Dashboard";
import Inicio from "../pages/Inicio";
import Login from "../pages/Login";
import Perfil from "../pages/Perfil";
import Plus from "../pages/Plus";
import Registro from "../pages/Registro";
import { user } from "../constants/methods";

import { Redirect } from "react-router-dom";

export const routes = [
  {
    path: "/eva/",
    exact: true,
    render: () => <Inicio />,
  },
  {
    path: "/eva/login",
    exact: true,
    render: () => (user() ? <Redirect to="/eva/dashboard" /> : <Login />),
  },
  {
    path: "/eva/registro",
    exact: true,
    render: () => (user() ? <Redirect to="/eva/dashboard" /> : <Registro />),
  },
  {
    path: "/eva/dashboard",
    exact: true,
    render: () => (user() ? <Dashboard /> : <Redirect to="/eva/login" />),
  },
  {
    path: "/eva/perfil",
    exact: true,
    render: () => (user() ? <Perfil /> : <Redirect to="/eva/login" />),
  },
  {
    path: "/eva/plus",
    exact: true,
    render: () => (user() ? <Plus /> : <Redirect to="/eva/login" />),
  },
  {
    path: "/eva/box",
    exact: true,
    render: () => (user() ? <Baul /> : <Redirect to="/eva/login" />),
  },
  { path: "", exact: false, render: () => <Redirect to="/eva/" /> },
];
