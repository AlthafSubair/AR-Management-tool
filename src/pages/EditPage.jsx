
import EditBar from '../components/edit/EditBar';
import EditHeader from '../components/edit/EditHeader';
import Main from '../components/edit/Main';
import SideBar from '../components/edit/SideBar';
import useTableStore from '../store/tableStore'

const EditPage = () => {

  const {result} = useTableStore();




  return (
    <div className='bg-[#f5f0f0] flex flex-row'>

      <div className='shadow-lg'>
          <SideBar />
      </div>
    
    <div className='w-full'>
        <EditHeader />
      <EditBar />

      <div className='w-full flex flex-row'>

      <div className='w-1/2'>
        <Main />
      </div>

       <div className='w-1/2'>
        cd
      </div>

      </div>
    </div>

    </div>
  )
}

export default EditPage