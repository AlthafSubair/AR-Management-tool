import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect } from 'react'
import useFilterFormStore from '../store/filterFormStore';
import { getList } from '../services/services';
import useTableStore from '../store/tableStore';


const Pagination = () => {

  const { form, setField } = useFilterFormStore();
  const { setResults, totalRecords, limit, start, results} = useTableStore();
const lim = results.length;

  useEffect(() => {

    const fetchList = async () => {
      try {
        const result = await getList(form);
        setResults(result.data)
      } catch (err) {
        console.log("error" + err)
      }
    };

    fetchList();
  }, [form.limit]);

  const incerementPagination = async () => {
    try {
       const currentStart = form.start ?? 0;

    // increment start
    const newStart = currentStart + 1;
      setField("start", newStart);
      const result = await getList(form);
      setResults(result.data)

    } catch (error) {
      console.log("error in inc pagination")
    }
  }



  return (
    <footer className='bg-secondary border border-slate-600 py-3 flex justify-center items-center gap-8'>

      <p>Rows per page:</p>
      <div className="relative flex flex-row w-16">
        <select
          value={form.limit}
          onChange={(e) => setField("limit", e.target.value)}
          className="peer appearance-none bg-transparent w-full text-gray-700 p-2 pr-8 leading-tight focus:outline-slate-400"
        >
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>

        <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
          <ChevronDown size={20} />
        </div>
      </div>

      <div>
        <p>{(lim * (start + 1)) - lim}-{lim * (start + 1)} of {totalRecords}</p>
      </div>

      <div className='flex flex-row gap-8'>
        <button><ChevronLeft /></button>
        <button onClick={incerementPagination}> <ChevronRight /></button>
      </div>

    </footer>
  )
}

export default Pagination