import React from 'react'
import Filter from './Filter'
import UpdateOwner from '../home/UpdateOwner'

const DasboardBar = () => {
  return (
    <div className='flex flex-row justify-end gap-4 mx-4'>

      {/* Fliter Options */}
      
        <Filter /> 

    {/* Multi select onwer update */}

        <UpdateOwner />
    </div>
  )
}

export default DasboardBar