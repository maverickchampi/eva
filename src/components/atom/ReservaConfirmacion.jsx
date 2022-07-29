import React from 'react'
import swal from "sweetalert";
import { convertirMoneda, horarioAmPm } from '../../constants/methods';

const ReservaConfirmacion = ({reserva, setReserva, setOpenModal}) =>{
  const fecha = new Date(reserva?.fecha).toLocaleString("es-PE", { dateStyle: 'long' });
  const hora_inicio = horarioAmPm(reserva?.horario?.horario_inicio || '00:00')
  const hora_fin = horarioAmPm(reserva?.horario?.horario_fin || '00:00')

  const handleReservarCita = () =>{
    setOpenModal(false)
  }
  console.log(reserva);

  const handleClose = () =>{
    setOpenModal(false)
    setReserva({})
  }
  return (
    <div className='reserva-confirmacion'>
      <div className='reserva-confirmacion-resumen'>
        <div className='reserva-resumen__item'>
          <h4>{reserva?.psicologo?.nombre} {reserva?.psicologo?.apellidoPa} {reserva?.psicologo?.apellidoMa}</h4>
          <span>{reserva?.psicologo?.profesion || 'Psicólogo'}</span>
        </div>
        <div className='reserva-resumen__item'>
          <div className='image-border'>
            <img src={reserva?.psicologo?.foto} alt={reserva?.psicologo?.nombre}/>
          </div>
        </div>
      </div>
      <div className='reserva-confirmacion-pago'>
        <h5>Datos de la cita</h5>
        <div>
          <span>Fecha</span>
          <p>{fecha}</p>
        </div>
        <div>
          <span>Horario</span>
          <p className='horario'>{hora_inicio} - {hora_fin}</p>
        </div>
        <div>
          <span>Precio</span>
          <p>{convertirMoneda(reserva?.psicologo?.monto)}</p>
        </div>
        <h5>Datos de la tarjeta</h5>
        <div>
          <span>Número de tarjeta</span>
          <p>{reserva?.pago?.numero_tarjeta}</p>
        </div>
        <div>
          <span>Fecha de vencimiento</span>
          <p>{reserva?.pago?.mes_vencimiento}/{reserva?.pago?.anio_vencimiento}</p>
        </div>
        <div>
          <span>CVV</span>
          <p>{reserva?.pago?.cvv}</p>
        </div>
        <div>
          <span>Titular</span>
          <p>{reserva?.pago?.titular}</p>
        </div>
      </div>
      <div className='botones botones-center'>
        <button type="button" className='btn btn-cancelar' onClick={handleClose}>Cancelar</button>
        <button type="button" className='btn btn-save' onClick={handleReservarCita}>Realizar reserva</button>
      </div>  
    </div>
  )
}

export default ReservaConfirmacion