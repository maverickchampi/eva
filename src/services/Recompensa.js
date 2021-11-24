import { url } from "../constants/global";

export const postRecompensa = async (data) => {
  const respuesta = await fetch(`${url}/recompensa`, {
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
