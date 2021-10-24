import Inicio from "../pages/Inicio";
import Error404 from "../pages/Error404";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Dashboard from "../pages/Dashboard";
import Perfil from "../pages/Perfil";

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
  { path: "", exact: false, render: () => <Error404 /> },
];
