import React from 'react'

const Modal = ({children, isOpen, onMouseDown}) => {
  return (
    <div className={`modal ${isOpen? 'modal-open' : ''}`} onMouseDown={onMouseDown}>
      <div className='modal-content'>
        {children}
      </div>
    </div>
  )
}

export default Modal