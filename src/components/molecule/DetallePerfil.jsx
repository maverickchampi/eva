import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { PRUEBAS, PRUEBAS_SAD } from "../../constants/global";
import { postAnimo } from "../../services/Animo";

const DetallePerfil = ({ user, setUser, cargarAnimos, fechaHoy, animos }) => {
  const [animo, setAnimo] = useState({
    id: fechaHoy.id,
    valor: fechaHoy.valor,
    usuario: fechaHoy.usuario,
    texto: fechaHoy.texto,
    fecha: fechaHoy.fecha,
  });
  const [recomendaciones, setRecomendaciones] = useState([]);

  const numerosAleatorios = (max) => {
    var cantidadNumeros = max;
    var myArray = [];
    while (myArray.length < 3) {
      var numeroAleatorio = Math.ceil(Math.random() * cantidadNumeros);
      var existe = false;
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i] == numeroAleatorio) {
          existe = true;
          break;
        }
      }
      if (!existe) {
        myArray[myArray.length] = numeroAleatorio;
      }
    }

    return myArray;
  };

  const verificarRecomendaciones = (animos) => {
    let cantidad = 0;
    let suma = 0;
    if (animos[4] > 0) {
      cantidad++;
      suma += animos[4];
    }

    if (animos[5] > 0) {
      cantidad++;
      suma += animos[5];
    }

    if (cantidad > 0) {
      let estadoAnimo = suma / cantidad;

      if (estadoAnimo === 3 || estadoAnimo === 2) {
        let positions = numerosAleatorios(PRUEBAS.length - 1);
        let recomendaciones = [];
        recomendaciones.push(PRUEBAS[positions[0]]);
        recomendaciones.push(PRUEBAS[positions[1]]);
        recomendaciones.push(PRUEBAS[positions[2]]);
        setRecomendaciones([...recomendaciones]);
      } else if (estadoAnimo === 1) {
        let positions = numerosAleatorios(PRUEBAS_SAD.length - 1);
        let recomendaciones = [];
        recomendaciones.push(PRUEBAS_SAD[positions[0]]);
        recomendaciones.push(PRUEBAS_SAD[positions[1]]);
        recomendaciones.push(PRUEBAS_SAD[positions[2]]);
        setRecomendaciones([...recomendaciones]);
      }
    } else {
      setRecomendaciones([
        {
          imagen: "https://i.ibb.co/thgt5kb/motivated.png",
          descripcion: "Es hora de comenzar a escribir como te sientes",
        },
        {
          imagen: "https://i.ibb.co/DWX2Sgx/motivation2.png",
          descripcion: "A más datos más análisis",
        },
        {
          imagen: "https://i.ibb.co/qCnxCvG/motivation3.png",
          descripcion: "Es hora de empezar",
        },
      ]);
    }
  };

  useEffect(() => {
    setAnimo({ ...fechaHoy });
  }, [fechaHoy]);

  useEffect(() => {
    verificarRecomendaciones(animos);
  }, [animos]);

  const cambiaValor = (valor) => {
    setAnimo({
      ...animo,
      valor: valor,
    });
  };

  const guardaAnimo = () => {
    const js = {
      animo: {
        valor: animo.valor,
        usuario: { id: user.id },
        texto: animo.texto,
      },
      login: {
        correo: user.correo,
        contrasenia: user.contrasenia,
      },
    };
    if (animo.id !== null && animo.fecha !== null) {
      js.animo.id = animo.id;
      js.animo.fecha = animo.fecha;
    }

    postAnimo(JSON.stringify(js))
      .then((res) => {
        swal("Estado de ánimo guardado", "", "success");
        cargarAnimos();
      })
      .catch((err) => {
        swal("Error", "Error al guardar estado de ánimo", "error");
      });
  };

  return (
    <div className="detalle-perfil">
      <div className="pregunta">
        {/* <h3>Pregunta del día</h3> */}
        <div className="pregunta-content">
          <h5>¿Como te sientes hoy?</h5>
          <ul className="animo-content">
            <li
              className={animo.valor === 3 ? "on" : ""}
              onClick={() => cambiaValor(3)}
            >
              Bien
            </li>
            <li
              className={animo.valor === 2 ? "on" : ""}
              onClick={() => cambiaValor(2)}
            >
              Regular
            </li>
            <li
              className={animo.valor === 1 ? "on" : ""}
              onClick={() => cambiaValor(1)}
            >
              Mal
            </li>
            <li
              className={animo.valor === 0 ? "on" : ""}
              onClick={() => cambiaValor(0)}
            >
              No lo sé
            </li>
          </ul>
          <textarea
            defaultValue={animo.texto}
            onChange={(e) => setAnimo({ ...animo, texto: e.target.value })}
          ></textarea>
          <div className="botones">
            <button onClick={() => guardaAnimo()}>Guardar</button>
          </div>
        </div>
      </div>
      <div className="recomendaciones">
        <h3>Recomendaciones</h3>
        <div className="recomendacion-content">
          {recomendaciones.map((item, index) => {
            return (
              <div className="recomendacion__item" key={index}>
                <span>{index + 1}</span>
                <img src={item?.imagen} alt={item?.descripcion} />
                <div className="recomendacion-descripcion">
                  {/* <h5>{item.titulo}</h5> */}
                  <p>{item?.descripcion}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetallePerfil;
