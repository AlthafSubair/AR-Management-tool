import HomeHeader from '../components/HomeHeader'
import DasboardBar from '../components/DasboardBar'
import useListStore from '../store/listStore';
import { useEffect } from 'react';
import { getPayor } from '../services/services';
import Table from '../components/Table';
import Pagination from '../components/Pagination';


const HomePage = () => {

  const {setList} = useListStore();

  useEffect(() => {
  const fetchPayor = async () => {
    try {
      const res = await getPayor();
      
      const {appointmentTypeDtoList, locationDtoList, payorDtoList, providerDtoList} = res.data?.data;

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

     <main className='flex-1'>
      <Table />
      </main> 

      <Pagination />

    </div>
  )
}

export default HomePage