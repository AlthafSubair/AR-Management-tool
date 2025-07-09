import SelectInput from './SelectInput';
import useCacheStore from '../store/cacheStore';

import useListStore from '../store/listStore';

const owner = [
    {value: "1775", text: "Test Internal"},
    {value: "1840", text: "Jisna Varghese"},
    {value: "12", text: "Vineeth Joseph"},
    {value: "1849", text: "Demo Test"},
    {value: "1903", text: "NoClinic ArManager"},
]


const Filter = () => {

const {clinics, status} = useCacheStore();

const {providerDtoList, payorDtoList} = useListStore()

    return (
        <div className='p-4 border border-slate-300 rounded-md m-6'>

            <form className="flex flex-row gap-4">

                <SelectInput datas={clinics} label={"Clinic"} valueKey={"clinicId"} labelKey={"name"} select={"Clinic"}/>

                <SelectInput datas={providerDtoList} label={"Provider"} valueKey={"id"} labelKey={"fullName"} select={"Provider"}/>

                <SelectInput datas={status} label={"Status"} valueKey={"value"} labelKey={"description"} select={"Status"}/>

                <SelectInput datas={payorDtoList} label={"Payour"} valueKey={"id"} labelKey={"payerName"} select={"Payour"}/>

                <SelectInput datas={owner} label={"Owner"} valueKey={"value"} labelKey={"text"} select={"Onwer"}/>


            </form>

        </div>
    )
}

export default Filter