import Inicio from "../pages/Inicio";
import Error404 from "../pages/Error404";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Dashboard from "../pages/Dashboard";
import Perfil from "../pages/Perfil";

import { Redirect } from "react-router-dom";
import { user } from "../constants/metodos";

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
    render: () => <Perfil />,
    // render: () => (user() ? <Perfil /> : <Redirect to="/login" />),
  },
  { path: "", exact: false, render: () => <Error404 /> },
];
