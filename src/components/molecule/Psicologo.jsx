import React from 'react'
import { convertirMoneda } from '../../constants/methods'
import FechaHorario from '../atom/FechaHorario'

const Psicologo = ({psicologo}) => {
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
          <FechaHorario fechas={psicologo?.fechas}/>
      </section>
    </div>
  )
}

export default Psicologo