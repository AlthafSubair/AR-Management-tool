import { ArrowLeft } from 'lucide-react'
import Profile from '../Profile'
import { useEffect, useState } from 'react'
import useTableStore from '../../store/tableStore'
import { getSummary } from '../../services/services'
import { Link } from 'react-router-dom'
import useSummaryStore from '../../store/summaryStore'

const EditHeader = () => {

    const { result } = useTableStore();

    const {details, setDetails} = useSummaryStore();

    useEffect(() => {
    const getDetails = async () => {
      try {
        if (result?.claimId) {
          const res = await getSummary(result?.claimId);
          setDetails(res)
        }
      } catch (error) {
        console.log("Error while fetching: ", error);
      }
    };

    getDetails();
  }, [result.claimId]);

 

  return (
    <header className='bg-white shadow-lg flex flex-row items-center justify-between px-8 py-4'>
       <Link to='/home'> <ArrowLeft className='text-gray-700' size={20} /></Link>
        <div className='flex flex-row gap-4 items-center justify-center'>

            <h1 className='text-slate-800 font-semibold text-2xl'>AR Mgmt Portal</h1>

            <h1 className='text-slate-800 font-medium text-[16px] text-center'>{details.dos}</h1>

           <div className='h-5 w-[2px] bg-slate-800'></div>

           <h1 className='text-slate-800 font-medium text-[16px] text-center'>{details?.patientName?.split(",")?.reverse()?.join(" ")}</h1>

           <div className='h-5 w-[2px] bg-slate-800'></div>

  <h1 className='text-slate-800 font-medium text-[16px] text-center'>{result.patientDob}</h1>

         { result.appointmentType && <div className='h-5 w-[2px] bg-slate-800'></div>}

          { result.appointmentType && <> <h1 className='text-slate-800 font-medium text-[16px] text-center'>{result.appointmentType}</h1>

           <div className='h-5 w-[2px] bg-slate-800'></div>
             </>}
         

                       <h1 className='text-slate-800 font-medium text-[16px] text-center'>{result.payorName}</h1>

         
        </div>
        
        <Profile />
    </header>
  )
}

export default EditHeader