import HomeHeader from '../components/home/HomeHeader'
import DasboardBar from '../components/home/DasboardBar'
import useListStore from '../store/listStore';
import { useEffect, useState } from 'react';
import { getPayor } from '../services/services';
import Table from '../components/home/Table';
import Pagination from '../components/home/Pagination';
import NoteModal from '../components/modals/NoteModal';
import EobModal from '../components/modals/EobModal';


const HomePage = () => {

  // store action

  const { setList } = useListStore();

  const [open, setOpen] = useState(
    {
      patientId: "",
      claimId: ""
    }
  )

  const [eob, setEob] = useState("");

  // fetching lists of appointmentTypeDtoList, locationDtoList, payorDtoList, providerDtoList

  useEffect(() => {
    const fetchPayor = async () => {
      try {
        const res = await getPayor(); // calling api service

        const { appointmentTypeDtoList, locationDtoList, payorDtoList, providerDtoList } = res.data?.data;

        setList({
          appointmentTypeDtoList,
          locationDtoList,
          payorDtoList,
          providerDtoList,
        });

      } catch (err) {
        console.error('Failed to fetch payor:', err);
      }
    };

    fetchPayor();
  }, []);


  return (
    <div className='flex flex-col min-h-screen'>

      {/* Header */}

      <HomeHeader />

      {/* Action Bar */}

      <DasboardBar />

      {/* Table */}

      <main className='flex-1 mb-8'>
        <Table setOpen={setOpen} setEob={setEob}/>
      </main>

      {open.patientId && (
  <NoteModal setOpen={setOpen} open={open} />
)}

{
  eob && (
    <EobModal setEob={setEob} eob={eob}/>
  )
}




      {/* pagination */}

      <Pagination />

    </div>
  )
}

export default HomePage