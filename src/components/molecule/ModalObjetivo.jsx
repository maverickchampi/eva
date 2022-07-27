import { useState } from 'preact/hooks'
import React from 'react'

const ModalObjetivo = ({titulo, objetivo, isEdit, isDelete, isAdd, setOpenModal}) => {
  // const [objetivo, setObjetivo] = useState({});

  const returnEdit = () =>{
    if(isEdit){
      return <button type='button' className='btn btn-save'>Editar</button>
    }
    return <></>
  }

  const returnDelete = () =>{
    if(isDelete){
      return <button type='button' className='btn btn-delete'>Eliminar</button>
    }
    return <></>
  }

  const returnAdd = () =>{
    if(isAdd){
      return <button type='button' className='btn btn-save'>Agregar</button>
    }
    return <></>
  }

  const handleCancelar = () =>{
    setOpenModal(false)
  }

  return (
    <div>
      <h3>{titulo}</h3>
      <form>
        <div className="form-input">
          <label htmlFor="titulo">Titulo</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            placeholder="Personal..."
            defaultValue={objetivo?.titulo || ''}
            required
          />
        </div>
        <div className="form-input">
          <label htmlFor="descripcion">Descripcion</label>
          <textarea
            id="descripcion"
            name="descripcion"
            placeholder="Descripcion..."
            defaultValue={objetivo?.descripcion || ''}
            required
          />
        </div>
        <div className="form-input">
          <label htmlFor="fecha_inicio">Fecha de inicio</label>
          <input
            type="date"
            name="fecha_inicio"
            defaultValue={objetivo?.fecha_inicio || ''}
          />
        </div>
        <div className="form-input">
          <label htmlFor="fecha_fin">Fecha fin</label>
          <input
            type="date"
            name="fecha_fin"
            defaultValue={objetivo?.fecha_fin || ''}
          />
        </div>
        <div className="form-input">
          <label htmlFor="nivel_esfuerzo">Nivel de esfuerzo</label>
          <select
            name="nivel_esfuerzo"
            defaultValue={objetivo?.nivel_esfuerzo || '-1'}
          >
            <option value="0">Bajo</option>
            <option value="1">Medio</option>
            <option value="2">Alto</option>
          </select>
        </div>
        <div className='botones botones-center'>
          {returnEdit()}
          {returnDelete()}
          {returnAdd()}
          <button type='button' className='btn btn-cancelar' onClick={handleCancelar}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}

export default ModalObjetivo