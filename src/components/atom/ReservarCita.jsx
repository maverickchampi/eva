import React, { useState } from 'react'
import ReservarPago from './ReservarPago';
import swal from "sweetalert";
import { convertirMoneda, horarioAmPm } from '../../constants/methods';

const ReservarCita = ({reserva, setReserva, setOpenModal, setModalContent,cargarCitas}) =>{
  const fecha = new Date(reserva?.fecha).toLocaleString("es-PE", { dateStyle: 'long' });
  const hora_inicio = horarioAmPm(reserva?.horario?.horario_inicio || '00:00')
  const hora_fin = horarioAmPm(reserva?.horario?.horario_fin || '00:00')
  const [descripcion, setDescripcion] = useState('')

  const handleSubmit = () =>{
    if(!descripcion){
      swal("Opps!", "Debes completar el campo descripción", "error");
      return
    }
    const data = {...reserva, descripcion: descripcion};
    setReserva(data)
    setOpenModal(true);
    setModalContent(
    <ReservarPago 
      reserva={data} 
      setReserva={setReserva} 
      setOpenModal={setOpenModal}
      setModalContent={setModalContent}
      cargarCitas={cargarCitas}
    />)
  }

  const handleClose = () =>{
    setOpenModal(false)
    setReserva({})
    setDescripcion('')
  }

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
          <h4>{reserva?.psicologo?.nombre} {reserva?.psicologo?.apellidoPa} {reserva?.psicologo?.apellidoMa}</h4>
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
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <div className='botones botones-center'>
            <button type="button" className='btn btn-cancelar' onClick={handleClose}>Cancelar</button>
            <button type="button" className='btn btn-save' onClick={handleSubmit}>Siguiente</button>
          </div>       
      </form>
    </div>
  )
}

export default ReservarCita