
import LoginHeader from '../components/login/LoginHeader'
import LoginForm from '../components/login/LoginForm'
import LoginFooter from '../components/login/LoginFooter'

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
