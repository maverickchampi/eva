import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from '../../components'

const Form = () => {
  return (
    <div className="login-form">
      <form className="login-form-container">
        <Input
          id='email'
          type='email'
          placeholder='demo@eva.com'
          name='email'
          nameFloat='Correo'
        />
         <Input
          id='password'
          type='password'
          placeholder='xxxxxxxx'
          name='password'
          nameFloat='Contraseña'
        />
        <Link
          to=''
          className='link'
        >
          ¿Olvidaste tu contraseña?
        </Link>
        <Button
          type='submit'
          className='btn-login mt-24'
          value="Ingresar"
        />
      </form>
    </div>
  )
}

export default Form