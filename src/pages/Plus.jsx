import React, { useRef, useState, useEffect } from "react";
import MenuLateral from "../components/atom/MenuLateral";
import * as faceapi from "face-api.js";
import swal from "sweetalert";
import { subirFoto } from "../services/Usuario";
import { user } from "../constants/methods";
import { getFoto } from "../services/Foto";

const Plus = () => {
  const videoHeight = 480;
  const videoWidth = 640;
  const [initialised, setInitialised] = useState(false);
  const [camara, setCamara] = useState(false);
  const [estado, setEstado] = useState();
  const [fotos, setFotos] = useState([]);
  const videoRef = useRef();
  const canvasRef = useRef();

  const startVideo = () => {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    navigator.getUserMedia(
      { video: {} },
      (stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCamara(true);
        }
      },
      (error) => console.error(error)
    );
  };

  const stopCamara = () => {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    navigator.getUserMedia(
      { video: {} },
      (stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = null;
          setCamara(false);
        }
      },
      (error) => console.error(error)
    );
  };

  const handleVideoOnPlay = () => {
    const _estado = setInterval(async () => {
      if (canvasRef.current) {
        if (initialised) {
          setInitialised(false);
        }
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
          videoRef.current
        );
        const displaySize = { width: videoWidth, height: videoHeight };
        faceapi.matchDimensions(canvasRef.current, displaySize);
        const detection = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detection, displaySize);

        if (canvasRef.current) {
          canvasRef.current
            .getContext("2d")
            .clearRect(0, 0, videoHeight, videoWidth);
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
          faceapi.draw.drawFaceExpressions(
            canvasRef.current,
            resizedDetections
          );
          console.log(detection);
        }
      } else {
        clearInterval(_estado);
        stopVideo();
      }
      console.log("Estoy consumiendo ram xd");
    }, 500);

    if (canvasRef.current) {
      setEstado(_estado);
    } else {
      clearInterval(_estado);
      stopVideo();
    }
  };

  const stopVideo = () => {
    setInitialised(true);
    clearInterval(estado);
    if (canvasRef.current) {
      canvasRef.current
        .getContext("2d")
        .clearRect(0, 0, videoWidth, videoHeight);
    }
  };

  const capturarFoto = () => {
    const canvas = document.getElementById("canvas");
    const video = document.getElementById("video");
    canvas.getContext("2d").drawImage(video, 0, 0, videoWidth, videoHeight);
    const img = canvas.toDataURL("image/png");
    canvasRef.current.getContext("2d").clearRect(0, 0, videoWidth, videoHeight);

    subirFoto(dataURLtoFile(img, `${user().nombre}-facial.png`))
      .then((res) => {
        swal("Foto subida", "", "success");
      })
      .catch((err) => {
        swal("Error", "Error al subir foto", "error");
      });
  };

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      setInitialised(true);
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ])
        .then()
        .catch((err) => console.log(err));
    };
    loadModels();
  }, []);

  useEffect(() => {
    const js = {
      correo: user().correo,
      contrasenia: user().contrasenia,
    };
    getFoto(JSON.stringify(js)).then((resp) => setFotos(resp.fotos));
  }, []);

  return (
    <div className="dashboard">
      <div className="container">
        <MenuLateral link={2} />
        <div className="content face">
          <span>{initialised ? "Modo desactivado" : "Modo activado"}</span>
          <span onClick={startVideo}>Activar CA</span>
          <span onClick={stopCamara}>Detener CA</span>
          {camara && (
            <>
              <span onClick={handleVideoOnPlay}>Empezar</span>
              <span onClick={stopVideo}>Detener</span>
              <span onClick={capturarFoto}>Capturar foto y subir</span>
            </>
          )}
          <div className="display-flex jc-center">
            <video
              id="video"
              ref={videoRef}
              height={videoHeight}
              width={videoWidth}
              autoPlay
              muted
            ></video>
            <canvas
              id="canvas"
              className="p-absolute"
              ref={canvasRef}
              height={videoHeight}
              width={videoWidth}
            ></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plus;
