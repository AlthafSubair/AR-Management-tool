import React from 'react'
import SelectInput from './SelectInput'

const owner = [
    { value: "1775", text: "Test Internal" },
    { value: "1840", text: "Jisna Varghese" },
    { value: "12", text: "Vineeth Joseph" },
    { value: "1849", text: "Demo Test" },
    { value: "1903", text: "NoClinic ArManager" },
]


const UpdateOwner = () => {
  return (
    <div className='p-4 border border-slate-300 rounded-md my-6 flex flex-row gap-4'>

      {/* Owner Selection */}
      
         {/* <SelectInput datas={owner} label={"Owner"} valueKey={"value"} labelKey={"text"} select={"Onwer"} /> */}

         {/* Update owner button */}

            <button disabled={true} className='bg-gray-400 px-6 py-2 rounded-md'>
                Update
            </button>
    </div>
  )
}

export default UpdateOwner