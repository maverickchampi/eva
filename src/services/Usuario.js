import { url } from "../constants/global";

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

export const putData = async (data) => {
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

export const getUsuarios = async () => {
  const respuesta = await fetch(`${url}/usuario`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
    },
  });

  const info = respuesta.json();
  return info;
};

export const getUsuario = async (id) => {
  const respuesta = await fetch(`${url}/usuario/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
    },
  });

  const info = respuesta.json();
  return info;
};

export const recuperaUsuario = async (data) => {
  const respuesta = await fetch(`${url}/usuario/recupera`, {
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

export const subirFoto = async (data) => {
  const formData = new FormData();

  formData.append("key", "2c2ba5b294260ca9d561a2bacc73faa2");
  formData.append("image", data);

  const respuesta = await fetch(`https://api.imgbb.com/1/upload`, {
    method: "POST",
    // headers: {
    //   "Content-Type": "multipart/form-data",
    //   Accept: "multipart/form-data",
    // },
    body: formData,
  });

  const info = respuesta.json();
  return info;
};
