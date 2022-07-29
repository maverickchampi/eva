import React from 'react'
import { horarioAmPm } from '../../constants/methods';

const Cita = ({cita}) => {
  const tiempo = new Date(cita?.fecha).setDate(new Date(cita?.fecha).getDate()+1);
  const fecha = new Date(tiempo).toLocaleString("es-PE", { dateStyle: 'long' });
  const hora_inicio = horarioAmPm(cita?.inicio || '00:00')
  const hora_fin = horarioAmPm(cita?.fin || '00:00')
  
  const returnEstado = () =>{
    let estado = '', color= '';
    switch (cita?.estado) {
      case 0:
        estado= 'Pendiente';
        color= '#ffd625';
        break;
      case 1:
        estado= 'Finalizado';
        color= '#4cd7a7';
        break;
      case 2:
        estado= 'Cancelado';
        color= '#f54851';
      break;
    }
    return (
      <span className="flag" style={{backgroundColor: `${color}`}}>{estado}</span>
    )
  }

  return (
    <div className='cita'>
      <div className='cita-psicologo'>
        <div className='image-border'>
          <img src={cita?.psicologo?.foto} alt={cita?.psicologo?.nombre}/>
        </div>
        <div className='cita-psicologo_content'>
          <h5>{cita?.psicologo?.nombre} {cita?.psicologo?.apellidoPa}</h5>
          <p>Psicólogo</p>
        </div>
      </div>
      <div className='cita-descripcion'>
        <div>
          <h5>Fecha y hora seleccionada</h5>
          <p>{fecha}<span className='horario'>{hora_inicio} - {hora_fin}</span></p>
        </div>
        <div>
          <h5>Descripcion</h5>
          <p>{cita?.descripcion}</p>
          {returnEstado()}
        </div>
      </div>
    </div>
  )
}

export default Cita