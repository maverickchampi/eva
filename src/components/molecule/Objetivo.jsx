import React from 'react'

const Objetivo = ({objetivo, handleClick}) => {
  const returnNivelEsfuerzo = () =>{
    let esfuerzo = '', color= '';
    switch (objetivo?.esfuerzo) {
      case 0:
        esfuerzo= 'bajo';
        color= '#f54851';
        break;
      case 1:
        esfuerzo= 'medio';
        color= '#ffd625';
        break;
      case 2:
        esfuerzo= 'alto';
        color= '#4cd7a7';
      break;
    }
    return (
      <span className="flag" style={{backgroundColor: `${color}`}}>{esfuerzo}</span>
    )
  }
  return (
    <div className='objetivo' onClick={handleClick}>
      <h4>{objetivo?.titulo}</h4>
      <p>{objetivo?.descripcion}</p>
      <div className='objetivo-result'>
        <p className='objetivo-fecha'>{objetivo?.inicio}</p>
        {returnNivelEsfuerzo()}
      </div>
    </div>
  )
}

export default Objetivo