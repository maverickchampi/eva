import Inicio from "../pages/Inicio";
import Error404 from "../pages/Error404";
import Login from "../pages/Login";

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
  { path: "", exact: false, render: () => <Error404 /> },
];
