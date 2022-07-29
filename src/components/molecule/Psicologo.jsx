import React, { useEffect, useState } from 'react'
import { convertirMoneda, horarioAmPm } from '../../constants/methods'
import FechaHorario from '../atom/FechaHorario'
import swal from "sweetalert";
import ReservarCita from '../atom/ReservarCita';

const Psicologo = ({psicologo, setModalContent, setOpenModal}) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState({});
  const [horaSeleccionada, setHoraSeleccionada] = useState({});
  const [reserva, setReserva] = useState({});

  const handleReserva = () =>{
    const data = {
      psicologo: {...psicologo},
      fecha: fechaSeleccionada?.fecha,
      horario: {...horaSeleccionada},
    }

    setReserva(data);
    setOpenModal(true);
    setModalContent(
    <ReservarCita 
      reserva={data} 
      setReserva={setReserva} 
      setOpenModal={setOpenModal} 
      setModalContent={setModalContent}
    />)
  }

  const buttonReservarCita = () =>{
    if(Object.keys(horaSeleccionada).length > 0){
      return (<div className='botones botones-center'>
                <button type="button" className='btn btn-reserva' onClick={handleReserva}>Reservar cita</button>
              </div>)
    }
    return <></>
  }
  
  return (
    <div className='psicologo'>
      <section className='psicologo-content'>
        <section className='psicologo-resumen'>
          <div className='image-border'>
            <img src={psicologo?.foto} alt={psicologo?.nombre}/>
          </div>
          <div className='psicologo-titulo'>
            <h4>{psicologo?.nombre} {psicologo?.apellidoPa} {psicologo?.apellidoMa}</h4>
            <span>{psicologo?.psicologo?.profesion || 'Psicólogo'}</span>
          </div>
        </section>
        <p>{psicologo?.descripcion}</p>
        <section className='psicologo-precio'>
          <span>Costo de atención</span>
          <p className='precio'>{convertirMoneda(psicologo?.monto || 0)}</p>
        </section>
      </section>
      <section className='psicologo-horarios'>
          <FechaHorario 
            fechas={psicologo?.fechas}
            fechaSeleccionada={fechaSeleccionada}
            setFechaSeleccionada= {setFechaSeleccionada}
            horaSeleccionada={horaSeleccionada}
            setHoraSeleccionada= {setHoraSeleccionada}
          />
          {buttonReservarCita()}
      </section>
    </div>
  )
}

export default Psicologo