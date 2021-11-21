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
    path: "/",
    exact: true,
    render: () => <Inicio />,
  },
  {
    path: "/login",
    exact: true,
    render: () => (user() ? <Redirect to="/dashboard" /> : <Login />),
  },
  {
    path: "/registro",
    exact: true,
    render: () => (user() ? <Redirect to="/dashboard" /> : <Registro />),
  },
  {
    path: "/dashboard",
    exact: true,
    render: () => (user() ? <Dashboard /> : <Redirect to="/login" />),
  },
  {
    path: "/perfil",
    exact: true,
    render: () => (user() ? <Perfil /> : <Redirect to="/login" />),
  },
  {
    path: "/plus",
    exact: true,
    render: () => (user() ? <Plus /> : <Redirect to="/login" />),
  },
  {
    path: "/box",
    exact: true,
    render: () => (user() ? <Baul /> : <Redirect to="/login" />),
  },
  { path: "", exact: false, render: () => <Inicio /> },
];
