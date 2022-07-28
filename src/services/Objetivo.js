import { url } from "../constants/global";

export const getObjetivos = async (data) => {
  const respuesta = await fetch(`${url}/objetivo/lista`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
    },
    body: data,
  });

  const info = respuesta.json();
  return info;
};

export const postObjetivos = async (data) => {
  const respuesta = await fetch(`${url}/objetivo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
    },
    body: data,
  });

  const info = respuesta.json();
  return info;
};

export const deleteObjetivos = async (data) => {
  const respuesta = await fetch(`${url}/objetivo`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
    },
    body: data,
  });

  const info = respuesta.json();
  return info;
};
