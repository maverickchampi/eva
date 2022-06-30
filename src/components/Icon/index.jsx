import React from 'react'
import listIcons from '../../assets/icons/listIcons.svg'

const Icon = (props) => {
  const { name, className, handleClick } = props

  return (
    <svg
      onClick={handleClick}
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      className={`svg svg-${name} icon ${className || ''}`}
    >
      <use xlinkHref={`${listIcons}#${name}`} />
    </svg>
  )
}

export default Icon