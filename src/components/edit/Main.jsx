import Charges from './Charges'
import ClaimSummary from './ClaimSummary'
import Log from './Log'

const Main = () => {

    

  return (
    <div className='px-12 flex flex-col gap-4'>
        <ClaimSummary />
        <Charges />
        <Log />
    </div>
  )
}

export default Main