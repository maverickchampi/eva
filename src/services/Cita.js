import { url } from "../constants/global";

export const postCita = async (data) => {
  const respuesta = await fetch(`${url}/cita`, {
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


export const getCitas = async (data) => {
  const respuesta = await fetch(`${url}/cita/lista`, {
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