import React, { useState } from 'react'
import swal from "sweetalert";
import { postObjetivos } from '../../services/Objetivo';

const ModalObjetivo = ({
  titulo, objetivo, isEdit, isDelete, isAdd, setOpenModal, cargarObjetivos, user,
}) => {
  const [objetivoOwn, setObjetivoOwn] = useState({
    id: objetivo?.id || null,
    titulo: objetivo?.titulo || '',
    descripcion: objetivo?.descripcion || '',
    fecha_inicio: objetivo?.fecha_inicio || '',
    fecha_fin: objetivo?.fecha_fin || '',
    nivel_esfuerzo: objetivo?.nivel_esfuerzo || '-1',
  });

  const returnEdit = () =>{
    const handleEditar = () => {
      console.log(objetivoOwn)
    }
    
    if(isEdit){
      return <button type='button' onClick={handleEditar} className='btn btn-save'>Editar</button>
    }
    return <></>
  }

  const returnDelete = () =>{
    const handleDelete = () => {
      console.log(objetivoOwn)
    }

    if(isDelete){
      return <button type='button' onClick={handleDelete} className='btn btn-delete'>Eliminar</button>
    }
    return <></>
  }

  const returnAdd = () =>{
    const handleAdd = () => {
      if(
        !titulo ||
        !objetivoOwn.descripcion ||
        !objetivoOwn.fecha_inicio ||
        !objetivoOwn.fecha_fin ||
        objetivoOwn.nivel_esfuerzo === '-1'
      ){
        swal("Opps!", "Debes completar todos los campos", "error");
        return
      }

      const json = {
        objetivo: {
          id: objetivoOwn.id,
          titulo: objetivoOwn.titulo,
          descripcion: objetivoOwn.descripcion,
          inicio: objetivoOwn.fecha_inicio,
          fin: objetivoOwn.fecha_fin,
          esfuerzo: objetivoOwn.nivel_esfuerzo,
          usuario: { id: user.id },
        },
        login: { correo: user.correo, contrasenia: user.contrasenia },
      };

      postObjetivos(JSON.stringify(json))
        .then((resp) => {
          if (resp?.mensaje){
            swal("Guardado!", "Tu objetivo se guardo", "success");
            cargarObjetivos()
            handleCancelar()
          }else{
            swal("Opps!", "No se pudo guardar", "error");
          }
        })
        .catch((err) => {
          swal("Opps!", "No se pudo guardar", "error");
        });
    }

    if(isAdd){
      return <button type='button' onClick={handleAdd} className='btn btn-save'>Agregar</button>
    }
    return <></>
  }

  const handleCancelar = () =>{
    setObjetivoOwn({
      titulo: '',
      descripcion: '',
      fecha_inicio: '',
      fecha_fin: '',
      nivel_esfuerzo: '-1',
    })
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
            value={objetivoOwn.titulo}
            onChange={(e) => setObjetivoOwn({...objetivoOwn, titulo: e.target.value})}
            required
          />
        </div>
        <div className="form-input">
          <label htmlFor="descripcion">Descripcion</label>
          <textarea
            id="descripcion"
            name="descripcion"
            placeholder="Descripcion..."
            value={objetivoOwn.descripcion}
            onChange={(e) => setObjetivoOwn({...objetivoOwn, descripcion: e.target.value})}
            required
          />
        </div>
        <div className="form-input">
          <label htmlFor="fecha_inicio">Fecha de inicio</label>
          <input
            type="date"
            name="fecha_inicio"
            value={objetivoOwn.fecha_inicio}
            onChange={(e) => setObjetivoOwn({...objetivoOwn, fecha_inicio: e.target.value})}
          />
        </div>
        <div className="form-input">
          <label htmlFor="fecha_fin">Fecha fin</label>
          <input
            type="date"
            name="fecha_fin"
            value={objetivoOwn.fecha_fin}
            onChange={(e) => setObjetivoOwn({...objetivoOwn, fecha_fin: e.target.value})}
          />
        </div>
        <div className="form-input">
          <label htmlFor="nivel_esfuerzo">Nivel de esfuerzo</label>
          <select
            name="nivel_esfuerzo"
            value={objetivoOwn.nivel_esfuerzo}
            onChange={(e) => setObjetivoOwn({...objetivoOwn, nivel_esfuerzo: e.target.value})}
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