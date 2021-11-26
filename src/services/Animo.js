import { url } from "../constants/global";

export const getAnimo = async (data) => {
  const respuesta = await fetch(`${url}/animo/lista`, {
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

export const postAnimo = async (data) => {
  const respuesta = await fetch(`${url}/animo`, {
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
