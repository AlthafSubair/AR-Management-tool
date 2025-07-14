import React from 'react'
import { Link } from 'react-router-dom'

const LoginHeader = () => {
  return (
    <header className='flex flex-col shadow-md'>

      {/* LOGO in the left of header */}

      <Link to='/'>
         <img src="/logo.png" alt="logo" className='login__header__logo'/>
      </Link> 
    </header>
  )
}

export default LoginHeader