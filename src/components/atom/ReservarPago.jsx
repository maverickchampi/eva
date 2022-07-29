import React, { useState } from 'react'
import ReservaConfirmacion from './ReservaConfirmacion';
import swal from "sweetalert";

const ReservarPago = ({reserva, setReserva, setModalContent, setOpenModal,cargarCitas}) =>{
  const [pago, setPago] = useState({
    numero_tarjeta: '',
    mes_vencimiento: '-1',
    anio_vencimiento: '-1',
    cvv: '',
    titular: '',
  })

  const handleSubmit = () =>{
    if(
      !pago.numero_tarjeta ||
      pago.mes_vencimiento === '-1'||
      pago.anio_vencimiento === '-1'||
      !pago.cvv ||
      !pago.titular 
    ){
      swal("Opps!", "Debes completar todos los campos", "error");
      return
    }
    const data = {...reserva, pago: {...pago}};
    setReserva(data)
    setOpenModal(true);
    setModalContent(
    <ReservaConfirmacion 
      reserva={data} 
      setReserva={setReserva} 
      setOpenModal={setOpenModal}
      cargarCitas={cargarCitas}
    />)
  }

  const handleClose = () =>{
    setOpenModal(false)
    setReserva({})
    setPago({
      numero_tarjeta: '',
      mes_vencimiento: '-1',
      anio_vencimiento: '-1',
      cvv: '',
      titular: '',
    })
  }

  return (
    <div className='reserva-pago'>
      <h3 className='title'>Pago</h3>
      <form>
        <div className="form-input">
          <label htmlFor="numero_tarjeta">Número de tarjeta</label>
          <input
            id="numero_tarjeta"
            minLength={16}
            maxLength={16}
            name="numero_tarjeta"
            placeholder="Número de tarjeta..."
            value={pago.numero_tarjeta}
            onChange={(e) => setPago({...pago, numero_tarjeta: e.target.value})}
          />
        </div>
        <div className="form-input">
          <label htmlFor="fecha_vencimiento">Fecha de vencimiento</label>
          <select
            name="fecha_vencimiento"
            style={{width: '105px'}}
            value={pago.mes_vencimiento}
            onChange={(e) => setPago({...pago, mes_vencimiento: e.target.value})}
          >
            <option value="-1" disabled>Mes</option>
            <option value="1">01</option>
            <option value="2">02</option>
            <option value="3">03</option>
            <option value="4">04</option>
            <option value="5">05</option>
            <option value="6">06</option>
            <option value="7">07</option>
            <option value="8">08</option>
            <option value="9">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <select
            name="fecha_vencimiento"
            style={{width: '105px'}}
            value={pago.anio_vencimiento}
            onChange={(e) => setPago({...pago, anio_vencimiento: e.target.value})}
          >
            <option value="-1" disabled>Año</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>
        <div className="form-input">
          <label htmlFor="cvv">CVV</label>
          <input
            id="cvv"
            name="cvv"
            minLength={3}
            maxLength={3}
            placeholder="CVV de la tarjeta"
            value={pago.cvv}
            onChange={(e) => setPago({...pago, cvv: e.target.value})}
          />
        </div>
        <div className="form-input">
          <label htmlFor="titular">Titular</label>
          <input
            id="titular"
            name="titular"
            minLength={5}
            placeholder="Titular de tarjeta"
            value={pago.titular}
            onChange={(e) => setPago({...pago, titular: e.target.value})}
          />
        </div>
        <div className='botones botones-center'>
          <button type="button" className='btn btn-cancelar' onClick={handleClose}>Cancelar</button>
          <button type="button" className='btn btn-save' onClick={handleSubmit}>Siguiente</button>
        </div>  
      </form>
    </div>
  )
}

export default ReservarPago