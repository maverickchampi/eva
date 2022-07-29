import React, { useState } from 'react'
import { convertirMoneda, horarioAmPm } from '../../constants/methods'
import FechaHorario from '../atom/FechaHorario'

const ReservarCita = ({reserva, setReserva}) =>{
  const fecha = new Date(reserva?.fecha).toLocaleString("es-PE", { dateStyle: 'long' });
  const hora_inicio = horarioAmPm(reserva?.horario?.horario_inicio || '00:00')
  const hora_fin = horarioAmPm(reserva?.horario?.horario_fin || '00:00')
  return (
    <div className='reserva-cita'>
      <h3 className='title'>Reservar cita</h3>
      <div className='reserva-resumen'>
        <div className='reserva-resumen__item'>
          <div className='image-border'>
            <img src={reserva?.psicologo?.foto} alt={reserva?.psicologo?.nombre}/>
          </div>
        </div>
        <div className='reserva-resumen__item'>
          <h4>{reserva?.psicologo?.nombre} {reserva?.psicologo?.apellido_paterno} {reserva?.psicologo?.apellido_materno}</h4>
          <span>{reserva?.profesion}</span>
          <h5>Fecha y hora seleccionada</h5>
          <p>{fecha}<span className='horario'>{hora_inicio} - {hora_fin}</span></p>
        </div>
      </div>
      <form>
          <textarea
            id="presentacion"
            name="presentacion"
            placeholder="Describe el tema a tratar..."
            required
          />
          <div className='botones botones-center'>
            <button type="button" className='btn btn-cancelar'>Cancelar</button>
            <button type="button" className='btn btn-save'>Siguiente</button>
          </div>       
      </form>
    </div>
  )
}

const ReservaPago = () =>{
  return (
    <div className='reserva-pago'>
      <div className='botones botones-center'>
        <button type="button" className='btn btn-cancelar'>Regresar</button>
        <button type="button" className='btn btn-save'>Confirmar</button>
      </div>  
    </div>
  )
}

const ReservaConfirmacion = () =>{
  return (
    <div className='reserva-confirmacion'>
      <div className='botones botones-center'>
        <button type="button" className='btn btn-save'>Realizar reserva</button>
      </div>  
    </div>
  )
}

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
    setModalContent(<ReservarCita reserva={data} setReserva={setReserva}/>)
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
            <h4>{psicologo?.nombre} {psicologo?.apellido_paterno} {psicologo?.apellido_materno}</h4>
            <span>{psicologo?.profesion}</span>
          </div>
        </section>
        <p>{psicologo?.descripcion}</p>
        <section className='psicologo-precio'>
          <span>Costo de atención</span>
          <p className='precio'>{convertirMoneda(psicologo?.precio)}</p>
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