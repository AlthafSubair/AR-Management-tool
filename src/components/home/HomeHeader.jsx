import React from 'react'
import Profile from '../Profile'


const HomeHeader = () => {

    

    

  return (
   <header className='flex flex-row items-center shadow-md justify-between px-8'>

    {/* Logo */}
    
         <h1 className='py-6 text-2xl font-semibold text-primary'>AR Management Platform</h1>

         {/* Profile */}

        <Profile />
     
    </header>
  )
}

export default HomeHeader