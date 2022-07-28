import React, { useEffect, useState } from 'react'
import swal from "sweetalert";
import { deleteObjetivos, postObjetivos } from '../../services/Objetivo';

const ModalObjetivo = ({
 titulo, objetivo, isEdit, isDelete, isAdd, setOpenModal, cargarObjetivos, user,
}) => {
  const [objetivoOwn, setObjetivoOwn] = useState({
    id: objetivo?.id || null,
    titulo: objetivo?.titulo || '',
    descripcion: objetivo?.descripcion || '',
    inicio: objetivo?.inicio || '',
    fin: objetivo?.fin || '',
    nivel_esfuerzo: objetivo?.esfuerzo || '-1',
  });

  const returnEdit = () =>{
    const handleEditar = () => {
      if(
        !titulo ||
        !objetivoOwn.descripcion ||
        !objetivoOwn.inicio ||
        !objetivoOwn.fin ||
        objetivoOwn.esfuerzo === '-1'
      ){
        swal("Opps!", "Debes completar todos los campos", "error");
        return
      }

      const json = {
        objetivo: {
          id: objetivoOwn.id,
          titulo: objetivoOwn.titulo,
          descripcion: objetivoOwn.descripcion,
          inicio: objetivoOwn.inicio,
          fin: objetivoOwn.fin,
          esfuerzo: objetivoOwn.esfuerzo,
          usuario: { id: user.id },
          estado: true,
        },
        login: { correo: user.correo, contrasenia: user.contrasenia },
      };

      postObjetivos(JSON.stringify(json))
        .then((resp) => {
          if (resp?.mensaje){
            swal("Guardado!", "Tu objetivo se actualizo", "success");
            cargarObjetivos()
            handleCancelar()
          }else{
            swal("Opps!", "No se pudo actualizar", "error");
          }
        })
        .catch((err) => {
          swal("Opps!", "No se pudo actualizar", "error");
        });
    }
    
    if(isEdit){
      return <button type='button' onClick={handleEditar} className='btn btn-save'>Editar</button>
    }
    return <></>
  }

  const returnDelete = () =>{
    const handleDelete = () => {
      swal({
        title: "¿Desea eliminar objetivo?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          const json = {
            objetivo: {
              id: objetivoOwn.id,
              titulo: objetivoOwn.titulo,
              descripcion: objetivoOwn.descripcion,
              inicio: objetivoOwn.inicio,
              fin: objetivoOwn.fin,
              esfuerzo: objetivoOwn.esfuerzo,
              usuario: { id: user.id },
              estado: false,
            },
            login: { correo: user.correo, contrasenia: user.contrasenia },
          };
    
          deleteObjetivos(JSON.stringify(json))
            .then((resp) => {
              if (resp?.mensaje){
                swal("Guardado!", "Tu objetivo se elimino", "success");
                cargarObjetivos()
                handleCancelar()
              }else{
                swal("Opps!", "No se pudo eliminar", "error");
              }
            })
            .catch((err) => {
              swal("Opps!", "No se pudo eliminar", "error");
            });
        }
      });
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
        !objetivoOwn.inicio ||
        !objetivoOwn.fin ||
        objetivoOwn.esfuerzo === '-1'
      ){
        swal("Opps!", "Debes completar todos los campos", "error");
        return
      }

      const json = {
        objetivo: {
          id: objetivoOwn.id,
          titulo: objetivoOwn.titulo,
          descripcion: objetivoOwn.descripcion,
          inicio: objetivoOwn.inicio,
          fin: objetivoOwn.fin,
          esfuerzo: objetivoOwn.esfuerzo,
          usuario: { id: user.id },
          estado: true,
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
    setOpenModal(false)
  }
  
  useEffect(() => {
    setObjetivoOwn({
      id: objetivo?.id || null,
      titulo: objetivo?.titulo || '',
      descripcion: objetivo?.descripcion || '',
      inicio: objetivo?.inicio || '',
      fin: objetivo?.fin || '',
      esfuerzo: objetivo?.esfuerzo || '-1',
    })
  }, [objetivo])
  

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
            value={objetivoOwn.inicio}
            onChange={(e) => setObjetivoOwn({...objetivoOwn, inicio: e.target.value})}
          />
        </div>
        <div className="form-input">
          <label htmlFor="fecha_fin">Fecha fin</label>
          <input
            type="date"
            name="fecha_fin"
            value={objetivoOwn.fin}
            onChange={(e) => setObjetivoOwn({...objetivoOwn, fin: e.target.value})}
          />
        </div>
        <div className="form-input">
          <label htmlFor="nivel_esfuerzo">Nivel de esfuerzo</label>
          <select
            name="nivel_esfuerzo"
            value={objetivoOwn.esfuerzo}
            onChange={(e) => setObjetivoOwn({...objetivoOwn, esfuerzo: e.target.value})}
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