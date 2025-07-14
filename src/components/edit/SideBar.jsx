import { AlignJustify, ChevronLeft, ChevronRight } from 'lucide-react';
import useTableStore from '../../store/tableStore';
import { Fragment, useEffect, useState } from 'react';
import { getList } from '../../services/services';
import formatDateForInput from '../../utils/formatDateForInput';
import formatFullName from '../../utils/formatFullName';

const ITEMS_PER_PAGE = 13;

const SideBar = () => {
  const { result } = useTableStore();

  const [fullList, setFullList] = useState([]);
  const [page, setPage] = useState(1);
  const [isShrink, setIsShrink] = useState(false);

  const totalPages = Math.ceil(fullList.length / ITEMS_PER_PAGE);

  const paginatedList = fullList.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const params = {
    startDate: formatDateForInput(result?.dos),
    endDate: new Date().toISOString().split('T')[0],
    start: 0,
    limit: 50, // don't change, as per your note
    ownerId: result?.ownerId,
  };

useEffect(() => {
  const fetchList = async () => {
    try {
      const res = await getList(params);
      const rawList = res.data.results || [];

      // Move selected item to top
      const reordered = [
        ...rawList.filter((item) => item.claimId === result.claimId),
        ...rawList.filter((item) => item.claimId !== result.claimId),
      ];

      setFullList(reordered);
    } catch (error) {
      console.log("error in fetching sidebar details", error);
    }
  };

  fetchList();
}, [result?.claimId, result?.dos, result?.ownerId]);


  return (
    <>
      {isShrink ? (
        <div className="bg-white w-12 min-h-screen flex flex-col">
          <div className="py-4 mx-auto">
            <AlignJustify
              className="text-slate-500"
              size={20}
              onClick={() => setIsShrink((prev) => !prev)}
            />
          </div>
        </div>
      ) : (
        <div className="bg-white w-[18rem] h-screen flex flex-col">
            <div className='flex flex-row gap-8'>
          <div className="p-4">
            <AlignJustify
              className="text-slate-500"
              size={20}
              onClick={() => setIsShrink((prev) => !prev)}
            />
          </div>

            {/* Pagination Controls */}
          <div className="flex items-center justify-center py-3 gap-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="text-gray-600 hover:text-black disabled:text-gray-300"
            >
              <ChevronLeft size={20} />
            </button>

            <span className="text-sm text-gray-700">
              Page {page} / {totalPages || 1}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="text-gray-600 hover:text-black disabled:text-gray-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
</div>

          <div className="w-full h-[1px] bg-slate-300" />

          <div className="text-lg font-medium text-center flex items-center justify-center py-4">
            Open Items
          </div>

          <div className="w-full h-[1px] bg-slate-300" />

          <div className="flex-1 overflow-y-auto">
            {paginatedList.map((li) => (
              <Fragment key={li?.claimId}>
                <div
                  className={`h-[63px] px-4 flex flex-col justify-center ${
                    li?.claimId === result.claimId
                      ? 'bg-primary text-white'
                      : 'bg-transparent text-gray-800'
                  }`}
                >
                  <h1>{li?.dos} / {formatFullName(li?.patientFName, li?.patientMName, li?.patientLName)}</h1>
                  <p className="text-sm text-slate-600 text-end truncate">
                    {li?.payorName?.slice(0, 12)}{li?.payorName?.length > 12 ? '...' : ''}
                  </p>
                </div>
                <div className="w-full h-[1px] bg-slate-300" />
              </Fragment>
            ))}
          </div>

        
        </div>
      )}
    </>
  );
};

export default SideBar;
