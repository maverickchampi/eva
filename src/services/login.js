import { url } from "../constants/variables";

export const postRegister = async (data) => {
  const respuesta = await fetch(`${url}/usuario`, {
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

export const postLogin = async (data) => {
  const respuesta = await fetch(`${url}/usuario/login`, {
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
