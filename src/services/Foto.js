import { url } from "../constants/global";

export const getFoto = async (data) => {
  const respuesta = await fetch(`${url}/foto/lista`, {
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

export const postFoto = async (data) => {
  const respuesta = await fetch(`${url}/foto`, {
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

export const putFoto = async (data) => {
  const respuesta = await fetch(`${url}/foto`, {
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
