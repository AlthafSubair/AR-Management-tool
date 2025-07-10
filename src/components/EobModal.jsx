import { useEffect, useState } from 'react'
import { getEob } from '../services/services';

const EobModal = ({ setEob, eob }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!eob) return; // Don't fetch if no eob provided

    const fetchData = async () => {
      try {
        const res = await getEob(eob);
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch eobs:", error);
      }
    };

    fetchData();
  }, [eob]);

  console.log(data)

  // Guard for empty data
 const columns = ["Posted", "Payer", "Check Date", "Amount", "Check #", "Type", "Actions"];

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
    <div className="bg-white rounded-md shadow-lg max-w-3xl min-w-3xl flex flex-col p-6 overflow-y-scroll max-h-[50%] min-h-[50%]">
      <div className='flex flex-row justify-between mx-4'>
        <h1 className='text-slate-950 text-xl font-semibold'>EOB</h1>
        <button
          className="text-600 rounded-md py-2 px-4 bg-primary text-white"
          onClick={() => setEob("")}
        >
          Close
        </button>
      </div>

      {data.length === 0 ? (
        <p className="m-8 text-center text-gray-500">No EOB data available.</p>
      ) : (
        <table className="min-w-full border border-gray-300 my-8 mx-auto">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr
                key={item.paymentId || idx}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {/* Match the columns with your actual data keys */}
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{item.postDate}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{item.payerName}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{item.checkDate}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{item.amount}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{item.cardNo}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{item.payerType}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">
                  {/* Example action buttons */}
                  <button className="text-primary hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);
}

export default EobModal;
