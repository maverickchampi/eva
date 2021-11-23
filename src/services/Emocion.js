import { url } from "../constants/global";

export const getEmocion = async (data) => {
  const respuesta = await fetch(`${url}/emocion/lista`, {
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

export const postEmocion = async (data) => {
  const respuesta = await fetch(`${url}/emocion`, {
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

export const putEmocion = async (data) => {
  const respuesta = await fetch(`${url}/emocion`, {
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
