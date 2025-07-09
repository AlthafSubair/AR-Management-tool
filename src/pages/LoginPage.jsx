import React from 'react'
import LoginHeader from '../components/LoginHeader'
import LoginForm from '../components/LoginForm'
import LoginFooter from '../components/LoginFooter'

export const LoginPage = () => {
  return (
    <div className='flex flex-col min-h-screen'>

      {/* Header */}

      <LoginHeader /> 

      {/* Login Form */}

      <main className='login__main'>
        <LoginForm />
      </main>

      {/* Footer */}

      <LoginFooter />

    </div>
  )
}
