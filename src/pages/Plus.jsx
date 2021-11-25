import React, { useRef, useState, useEffect } from "react";
import MenuLateral from "../components/atom/MenuLateral";
import * as faceapi from "face-api.js";

const Plus = () => {
  const videoHeight = 480;
  const videoWidth = 640;
  const [initialised, setInitialised] = useState(false);
  const [face, setFace] = useState();
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
      (stream) => (videoRef.current.srcObject = stream),
      (error) => console.error(error)
    );
  };

  const handleVideoOnPlay = () => {
    const _face = setInterval(async () => {
      if (initialised) {
        setInitialised(false);
      }
      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
        videoRef.current
      );
      const displaySize = { width: videoWidth, height: videoHeight };
      faceapi.matchDimensions(canvasRef.current, displaySize);
      const detection = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detection, displaySize);
      canvasRef.current
        .getContext("2d")
        .clearRect(0, 0, videoHeight, videoWidth);
      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      // console.log(detection);
    }, 500);

    setFace(_face);
  };

  const stopVideo = () => {
    clearInterval(face);
  };

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
        .then(startVideo)
        .catch((err) => console.log(err));
    };
    loadModels();
  }, []);

  return (
    <div className="dashboard">
      <div className="container">
        <MenuLateral link={2} />
        <div className="content face">
          <span>{initialised ? "Modo desactivado" : "Modo activado"}</span>
          <span onClick={handleVideoOnPlay}>Empezar</span>
          <span onClick={stopVideo}>Detener</span>
          <div className="display-flex jc-center">
            <video
              ref={videoRef}
              height={videoHeight}
              width={videoWidth}
              autoPlay
              muted
            ></video>
            <canvas className="p-absolute" ref={canvasRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plus;
