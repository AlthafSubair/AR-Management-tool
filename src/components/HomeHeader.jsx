import React from 'react'
import Profile from './Profile'


const HomeHeader = () => {

    

    

  return (
   <header className='flex flex-row items-center shadow-md justify-between'>

    {/* Logo */}
    
         <h1 className='py-6 px-12 text-2xl font-semibold text-primary'>AR Management Platform</h1>

         {/* Profile */}

        <Profile />
     
    </header>
  )
}

export default HomeHeader