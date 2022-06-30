import React, { useState } from 'react'
import Icon from '../Icon'

const Input = (props) => {
  const {
    id,
    type,
    placeholder,
    name,
    nameFloat,
    handleChange,
    error,
    textError,
  } = props

  const [showPassword, setShowPassword] = useState(false)

  const handleChangeType = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='input-float'>
      <div className={`input-float__container ${error ? 'error' : ''}`}>
        <input
          id={id}
          type={showPassword ? 'text' : type}
          name={name}
          placeholder={showPassword ? '12345678' : placeholder}
          autoComplete='off'
          onChange={handleChange}
        />
        <span className='float'>{nameFloat}</span>
        {type === 'password' && <Icon className='cursor-pointer' name={showPassword ? 'show-eye' : 'hide-eye'} handleClick={handleChangeType} />}
        {error && <span className='error mb-8'>{textError}</span>}
      </div>
    </div>
  )
}

export default Input
