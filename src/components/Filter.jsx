import SelectInput from './SelectInput';
import useCacheStore from '../store/cacheStore';
import useListStore from '../store/listStore';
import useFilterFormStore from '../store/filterFormStore';
import { exportTable, getList } from '../services/services';
import useTableStore from '../store/tableStore';


const owner = [
    { value: "1775", text: "Test Internal" },
    { value: "1840", text: "Jisna Varghese" },
    { value: "12", text: "Vineeth Joseph" },
    { value: "1849", text: "Demo Test" },
    { value: "1903", text: "NoClinic ArManager" },
]


const Filter = () => {

    // getting values to map in select from stores

    const { clinics, status } = useCacheStore();
    const { providerDtoList, payorDtoList } = useListStore();

    const { form, setField } = useFilterFormStore();

    const { setResults, results } = useTableStore();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await getList(form);
            setResults(res.data)

        } catch (error) {
            console.log("error on field: " + error)
        }
    }

    const onExport = async (e) => {
        e.preventDefault();
        try {

            const rawParams = {
                startDate: form?.startDate,
                endDate: form?.endDate,
                clinicId: form?.clinicId,
                providerId: form?.providerId,
            };

            const params = Object.fromEntries(
                Object.entries(rawParams).filter(([_, v]) => v !== null && v !== undefined && v !== '')
            );
            
            console.log('Export request params:', params);

            const res = await exportTable(params);

            console.log(res);

             if (res.type === 'application/json') {
      const text = await res.text();
      const errorJson = JSON.parse(text);
      console.error('Server error:', errorJson);
      alert(`Export failed: ${errorJson?.error?.message?.['117'] || 'Unknown error'}`);
      return;
    }


 // If res is a Blob, handle download here
        const url = window.URL.createObjectURL(new Blob([res]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'ar_export.csv'); // Adjust filename/type as needed
        document.body.appendChild(link);
        link.click();
        link.remove();

        } catch (error) {
            console.log("error on exporting", error)
        }
    }



    return (
        <div className='p-4 border border-slate-300 rounded-md my-6'>

            <form className="flex flex-row gap-4" onSubmit={onSubmit}>

                {/* Clinic Selection */}

                <SelectInput datas={clinics} label={"Clinic"} valueKey={"clinicId"} labelKey={"name"} select={"All Clinic"} value={form.clinicId} onChange={(e) => setField("clinicId", e.target.value)} />

                {/* Provider Selection */}

                <SelectInput datas={providerDtoList} label={"Provider"} valueKey={"id"} labelKey={"fullName"} select={"All Provider"} value={form.providerId} onChange={(e) => setField("providerId", e.target.value)} />

                {/* Status Selection */}

                <SelectInput datas={status} label={"Status"} valueKey={"value"} labelKey={"description"} select={"All Status"} value={form.statusId} onChange={(e) => setField("statusId", e.target.value)} />

                {/* Date of DOS Start */}

                <div className="relative w-40">
                    <label
                        htmlFor="date"
                        className="absolute -top-3 left-0 text-sm text-teal-600"
                    >
                        DOS Start
                    </label>

                    <input
                        type="date"
                        value={form.startDate}
                        onChange={(e) => setField("startDate", e.target.value)}
                        className="peer appearance-none bg-transparent border-b border-teal-500 w-full text-gray-700 py-2 leading-tight focus:outline-none uppercase"
                    />
                </div>

                {/* Date of DOS End */}

                <div className="relative w-40">
                    <label
                        htmlFor="date"
                        className="absolute -top-3 left-0 text-sm text-teal-600"
                    >
                        DOS End
                    </label>

                    <input
                        type="date"
                        value={form.endDate}
                        onChange={(e) => setField("endDate", e.target.value)}
                        className="peer appearance-none bg-transparent border-b border-teal-500 w-full text-gray-700 py-2 leading-tight focus:outline-none uppercase"
                    />
                </div>

                {/* Payour Selection */}

                <SelectInput datas={payorDtoList} label={"Payour"} valueKey={"id"} labelKey={"payerName"} select={"All Payour"} value={form.payorId} onChange={(e) => setField("payorId", e.target.value)} />

                {/* Owner Selection */}

                <SelectInput datas={owner} label={"Owner"} valueKey={"value"} labelKey={"text"} select={"All Onwer"} value={form.ownerId} onChange={(e) => setField("ownerId", e.target.value)} />

                {/* Due Date */}

                <div className="relative w-40">
                    <label
                        htmlFor="date"
                        className="absolute -top-3 left-0 text-sm text-teal-600"
                    >
                        Due Date
                    </label>

                    <input
                        type="date"
                        className="peer appearance-none bg-transparent border-b border-teal-500 w-full text-gray-700 py-2 leading-tight focus:outline-none uppercase"
                    />
                </div>

                {/* Filter button */}

                <button
                    type='submit'
                    className='px-6 py-2 bg-primary text-white rounded-md'>
                    Filter
                </button>

                {/* Export Button */}

                <button
                    type='button'
                    onClick={onExport}
                    className='px-6 py-2 bg-primary text-white rounded-md'>
                    Export
                </button>


            </form>

        </div>
    )
}

export default Filter