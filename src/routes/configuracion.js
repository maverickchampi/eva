import Inicio from "../pages/Inicio";
import Error404 from "../pages/Error404";

export const routes = [
  {
    path: "/",
    exact: true,
    render: () => <Inicio />,
  },

  { path: "", exact: false, render: () => <Error404 /> },
];
