import React, { useEffect, useState } from 'react'
import { fechaMesDia, horarioAmPm } from '../../constants/methods'

const Fecha = ({fecha, isSelect, handleClick}) =>{
  const fechaFormato = fechaMesDia(fecha)
  return (
    <div className={`fecha__item ${isSelect? 'on': ''}`} onClick={handleClick}>
        <span>{fechaFormato?.mes}</span>
        <p>{fechaFormato?.dia}</p>
    </div>
  )
}

const Horario = ({hora, isSelect, handleClick}) =>{
  return (
    <div className={`horario__item ${isSelect? 'on': ''}`} onClick={handleClick}>
      <p>{horarioAmPm(hora)}</p>
    </div>
  )
}

const FechaHorario = ({fechas, fechaSeleccionada, setFechaSeleccionada, horaSeleccionada, setHoraSeleccionada}) => {

  useEffect(() => {
    const fecha = fechas.length > 0 ? fechas[0] : {};
    setFechaSeleccionada(fecha)
  }, []);

  const handleFlechaIzquierda = () =>{
    const fila = document.querySelector('.carousel-content');
    fila.scrollLeft -= fila.offsetWidth;
  }

  const handleFlechaDerecha = () =>{
    const fila = document.querySelector('.carousel-content');
    fila.scrollLeft += fila.offsetWidth;
  }

  return (
    <>
     {
        fechas.length > 0 ? 
        (
          <div className='fecha-horario'>
            <div className='carousel-fechas'>
              <button role="button" id="flecha-izquierda" className="flecha-izquierda" onClick={handleFlechaIzquierda}>
                <i id="flecha-izquierda" className="fas fa-angle-left" />
              </button>
              <div className='carousel-content'>
                <div className='fechas-content'>
                  {fechas?.map((fecha, key) => (
                    <Fecha 
                      key={key} 
                      fecha={fecha?.fecha} 
                      isSelect={fechaSeleccionada?.id === fecha.id}
                      handleClick={()=> {
                        setFechaSeleccionada(fecha)
                        setHoraSeleccionada({})
                      }}
                    />
                  ))}
                </div>
              </div>
              <button role="button" id="flecha-derecha" className="flecha-derecha" onClick={handleFlechaDerecha}>
                <i className="fas fa-angle-right"></i>
              </button>
            </div>
            <div className='horarios-content'>
              {fechaSeleccionada?.horarios?.length > 0 && 
              fechaSeleccionada?.horarios?.map((horario, key) => (
                <Horario 
                  key={key} 
                  hora={horario?.horario_inicio} 
                  isSelect={horaSeleccionada?.id === horario.id}
                  handleClick={()=> setHoraSeleccionada(horario)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className='content-vacio'>No tiene fecha y horario disponible</div>
        )
      }
    </>
  )
}

export default FechaHorario