import React from 'react'

const EditBar = () => {
  return (
    <div className='flex flex-row gap-4 justify-center items-center my-6'>

        <button className='py-2 bg-primary text-white px-6 text-lg font-semibold rounded-md'>
            Basic
        </button>

        <button className='py-2 bg-primary text-white px-6 text-lg font-semibold rounded-md'>
            Notes
        </button>

         <button className='py-2 bg-primary text-white px-6 text-lg font-semibold rounded-md'>
           Payments
        </button>

         <button className='py-2 bg-primary text-white px-6 text-lg font-semibold rounded-md'>
           Files
        </button>

    </div>
  )
}

export default EditBar