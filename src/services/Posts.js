import { url } from "../constants/global";

export const getPosts = async () => {
  const respuesta = await fetch(`${url}/post`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
    },
  });

  const info = respuesta.json();
  return info;
};

export const postPost = async (data) => {
  const respuesta = await fetch(`${url}/post`, {
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

export const putPost = async (data) => {
  const respuesta = await fetch(`${url}/post`, {
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

export const postLike = async (data) => {
  const respuesta = await fetch(`${url}/post/like`, {
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
